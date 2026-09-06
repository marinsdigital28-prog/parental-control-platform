import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Policy } from './policy.entity';
import { DevicesService } from '../devices/devices.service';

@Injectable()
export class PoliciesService {
  constructor(
    @InjectRepository(Policy)
    private readonly policiesRepo: Repository<Policy>,
    private readonly devicesService: DevicesService,
  ) {}

  async getOrCreateForDevice(deviceId: string, userId: string) {
    await this.devicesService.findOne(deviceId, userId);

    let policy = await this.policiesRepo.findOne({ where: { deviceId } });
    if (!policy) {
      policy = this.policiesRepo.create({
        deviceId,
        dailyLimitMinutes: null,
        bedtimeStart: null,
        bedtimeEnd: null,
        enabled: true,
        version: 1,
      });
      policy = await this.policiesRepo.save(policy);
    }
    return policy;
  }

  async updatePolicy(
    deviceId: string,
    userId: string,
    data: Partial<{
      dailyLimitMinutes: number | null;
      bedtimeStart: string | null;
      bedtimeEnd: string | null;
      enabled: boolean;
    }>,
  ) {
    const policy = await this.getOrCreateForDevice(deviceId, userId);
    Object.assign(policy, data);
    policy.version += 1;
    return this.policiesRepo.save(policy);
  }
}
