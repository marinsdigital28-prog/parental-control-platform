import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Family } from './family.entity';
import { FamilyMember } from './family-member.entity';
import { FamiliesService } from './families.service';
import { FamiliesController } from './families.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Family, FamilyMember])],
  providers: [FamiliesService],
  controllers: [FamiliesController],
  exports: [FamiliesService],
})
export class FamiliesModule {}
