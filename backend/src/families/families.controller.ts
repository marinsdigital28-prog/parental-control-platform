import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { FamiliesService } from './families.service';
import { CreateFamilyDto } from './dto/create-family.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('families')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('families')
export class FamiliesController {
  constructor(private readonly familiesService: FamiliesService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova família' })
  async create(@Req() req: any, @Body() dto: CreateFamilyDto) {
    const family = await this.familiesService.create(req.user.sub, dto.name);
    return {
      success: true,
      data: family,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Listar famílias do usuário' })
  async list(@Req() req: any) {
    const families = await this.familiesService.findByUser(req.user.sub);
    return {
      success: true,
      data: families,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalhes de uma família' })
  async getOne(@Req() req: any, @Param('id') id: string) {
    const family = await this.familiesService.findOne(id, req.user.sub);
    return {
      success: true,
      data: family,
    };
  }
}
