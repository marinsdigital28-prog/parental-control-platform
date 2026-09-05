import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreatePairingDto {
  @ApiProperty({ description: 'ID da família' })
  @IsUUID()
  familyId: string;
}
