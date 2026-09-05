import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';

export class ValidatePairingDto {
  @ApiPropertyOptional({ example: 'AB3K9X2P' })
  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(12)
  shortCode?: string;

  @ApiPropertyOptional({ description: 'Token completo do QR Code' })
  @IsOptional()
  @IsString()
  token?: string;

  @ApiProperty({ example: 'uuid-do-dispositivo-android' })
  @IsString()
  @MinLength(8)
  deviceUuid: string;

  @ApiProperty({ example: 'Celular do João' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({ example: '14' })
  @IsOptional()
  @IsString()
  androidVersion?: string;

  @ApiPropertyOptional({ example: 'Samsung' })
  @IsOptional()
  @IsString()
  manufacturer?: string;

  @ApiPropertyOptional({ example: 'Galaxy A54' })
  @IsOptional()
  @IsString()
  model?: string;

  @ApiPropertyOptional({ example: '1.0.0' })
  @IsOptional()
  @IsString()
  appVersion?: string;
}
