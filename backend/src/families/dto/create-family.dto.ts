import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateFamilyDto {
  @ApiProperty({ example: 'Família Silva' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;
}
