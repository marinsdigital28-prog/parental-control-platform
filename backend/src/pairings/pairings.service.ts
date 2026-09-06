import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan, IsNull } from 'typeorm';
import { createHash, randomBytes, randomInt } from 'crypto';
import { DevicePairing } from './pairing.entity';
import { FamiliesService } from '../families/families.service';
import { DevicesService } from '../devices/devices.service';

@Injectable()
export class PairingsService {
  constructor(
    @InjectRepository(DevicePairing)
    private readonly pairingsRepo: Repository<DevicePairing>,
    private readonly familiesService: FamiliesService,
    private readonly devicesService: DevicesService,
  ) {}

  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  private generateShortCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars[randomInt(0, chars.length)];
    }
    return code;
  }

  async createPairing(familyId: string, userId: string) {
    await this.familiesService.ensureUserBelongsToFamily(familyId, userId);

    const rawToken = randomBytes(32).toString('hex');
    const shortCode = this.generateShortCode();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    const pairing = this.pairingsRepo.create({
      familyId,
      tokenHash: this.hashToken(rawToken),
      shortCode,
      expiresAt,
      createdByUserId: userId,
    });

    await this.pairingsRepo.save(pairing);

    return {
      pairingId: pairing.id,
      shortCode,
      token: rawToken,
      expiresAt,
      expiresInSeconds: 900,
    };
  }

  async validateAndPair(data: {
    shortCode?: string;
    token?: string;
    deviceUuid: string;
    name: string;
    androidVersion?: string;
    manufacturer?: string;
    model?: string;
    appVersion?: string;
  }) {
    if (!data.shortCode && !data.token) {
      throw new BadRequestException('Informe o código ou o token de pareamento');
    }

    let pairing: DevicePairing | null = null;

    if (data.token) {
      const hash = this.hashToken(data.token);
      pairing = await this.pairingsRepo.findOne({
        where: {
          tokenHash: hash,
          usedAt: IsNull(),
          expiresAt: MoreThan(new Date()),
        },
      });
    } else if (data.shortCode) {
      pairing = await this.pairingsRepo.findOne({
        where: {
          shortCode: data.shortCode.toUpperCase(),
          usedAt: IsNull(),
          expiresAt: MoreThan(new Date()),
        },
      });
    }

    if (!pairing) {
      throw new BadRequestException(
        'Código inválido, expirado ou já utilizado',
      );
    }

    pairing.usedAt = new Date();
    await this.pairingsRepo.save(pairing);

    const device = await this.devicesService.create({
      familyId: pairing.familyId,
      name: data.name,
      deviceUuid: data.deviceUuid,
      androidVersion: data.androidVersion,
      manufacturer: data.manufacturer,
      model: data.model,
      appVersion: data.appVersion,
    });

    pairing.deviceId = device.id;
    await this.pairingsRepo.save(pairing);

    return {
      success: true,
      data: {
        deviceId: device.id,
        familyId: pairing.familyId,
        name: device.name,
        status: device.status,
      },
    };
  }
}
