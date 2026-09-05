import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { PairingsService } from './pairings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePairingDto } from './dto/create-pairing.dto';
import { ValidatePairingDto } from './dto/validate-pairing.dto';

@ApiTags('pairings')
@Controller('pairings')
export class PairingsController {
  constructor(private readonly pairingsService: PairingsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Gerar código/QR de pareamento (responsável)' })
  async create(@Req() req: any, @Body() dto: CreatePairingDto) {
    const result = await this.pairingsService.createPairing(
      dto.familyId,
      req.user.sub,
    );
    return {
      success: true,
      data: result,
    };
  }

  @Post('validate')
  @ApiOperation({
    summary: 'Validar código e vincular dispositivo (app supervisionado)',
  })
  async validate(@Body() dto: ValidatePairingDto) {
    return this.pairingsService.validateAndPair(dto);
  }
}
