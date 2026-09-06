import {
  Controller,
  Get,
  Put,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { PoliciesService } from './policies.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('policies')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('devices/:deviceId/policy')
export class PoliciesController {
  constructor(private readonly policiesService: PoliciesService) {}

  @Get()
  @ApiOperation({ summary: 'Obter política do dispositivo' })
  async get(@Req() req: any, @Param('deviceId') deviceId: string) {
    const policy = await this.policiesService.getOrCreateForDevice(
      deviceId,
      req.user.sub,
    );
    return { success: true, data: policy };
  }

  @Put()
  @ApiOperation({ summary: 'Atualizar política do dispositivo' })
  async update(
    @Req() req: any,
    @Param('deviceId') deviceId: string,
    @Body() body: any,
  ) {
    const policy = await this.policiesService.updatePolicy(
      deviceId,
      req.user.sub,
      body,
    );
    return { success: true, data: policy };
  }
}
