import {
  Controller,
  Get,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { DevicesService } from './devices.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('devices')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar dispositivos do responsável' })
  async list(@Req() req: any) {
    const devices = await this.devicesService.listForUser(req.user.sub);
    return {
      success: true,
      data: devices,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalhes de um dispositivo' })
  async getOne(@Req() req: any, @Param('id') id: string) {
    const device = await this.devicesService.findOne(id, req.user.sub);
    return {
      success: true,
      data: device,
    };
  }
}
