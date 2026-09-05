import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevicePairing } from './pairing.entity';
import { PairingsService } from './pairings.service';
import { PairingsController } from './pairings.controller';
import { FamiliesModule } from '../families/families.module';
import { DevicesModule } from '../devices/devices.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DevicePairing]),
    FamiliesModule,
    DevicesModule,
  ],
  providers: [PairingsService],
  controllers: [PairingsController],
  exports: [PairingsService],
})
export class PairingsModule {}
