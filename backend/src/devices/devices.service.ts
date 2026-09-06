import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device, DeviceStatus } from './device.entity';
import { FamiliesService } from '../families/families.service';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    private readonly devicesRepo: Repository<Device>,
    private readonly familiesService: FamiliesService,
  ) {}

  async create(data: {
    familyId: string;
    name: string;
    deviceUuid: string;
    androidVersion?: string;
    manufacturer?: string;
    model?: string;
    appVersion?: string;
  }): Promise<Device> {
    const device = this.devicesRepo.create({
      familyId: data.familyId,
      name: data.name,
      deviceUuid: data.deviceUuid,
      androidVersion: data.androidVersion || null,
      manufacturer: data.manufacturer || null,
      model: data.model || null,
      appVersion: data.appVersion || null,
      status: DeviceStatus.ONLINE,
      lastSeenAt: new Date(),
    });
    return this.devicesRepo.save(device);
  }

  async findByFamily(familyId: string, userId: string): Promise<Device[]> {
    await this.familiesService.ensureUserBelongsToFamily(familyId, userId);
    return this.devicesRepo.find({
      where: { familyId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, userId: string): Promise<Device> {
    const device = await this.devicesRepo.findOne({ where: { id } });
    if (!device) throw new NotFoundException('Dispositivo não encontrado');

    await this.familiesService.ensureUserBelongsToFamily(
      device.familyId,
      userId,
    );
    return device;
  }

  async updateStatus(
    deviceId: string,
    status: DeviceStatus,
    batteryLevel?: number,
  ) {
    await this.devicesRepo.update(deviceId, {
      status,
      lastSeenAt: new Date(),
      ...(batteryLevel !== undefined && { batteryLevel }),
    });
  }

  async listForUser(userId: string): Promise<Device[]> {
    const families = await this.familiesService.findByUser(userId);
    if (families.length === 0) return [];

    const familyIds = families.map((f) => f.id);
    return this.devicesRepo
      .createQueryBuilder('device')
      .where('device.family_id IN (:...familyIds)', { familyIds })
      .orderBy('device.last_seen_at', 'DESC')
      .getMany();
  }
}
