import { Controller, Post, Body, Patch, Param, Delete, Get } from '@nestjs/common';
import { SesionesService } from './sesiones.service';
import { CreateSesionDto } from './dto/create-sesion.dto';
import { UpdateSesionDto } from './dto/update-sesion.dto';

@Controller('sesiones')
export class SesionesController {
  constructor(private readonly sesionesService: SesionesService) {}

  @Post()
  create(@Body() createSesionDto: CreateSesionDto) {
    return this.sesionesService.create(createSesionDto);
  }

  @Get()
  findAll() {
    return this.sesionesService.findAll();
  }

  @Get('proximas')
  findProximas7Dias() {
    return this.sesionesService.findProximas7Dias();
  }

  @Get('psicologo/:psychologistId')
  findByPsychologist(@Param('psychologistId') psychologistId: string) {
    return this.sesionesService.findByPsychologist(+psychologistId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSesionDto: UpdateSesionDto) {
    return this.sesionesService.update(+id, updateSesionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sesionesService.remove(+id);
  }
}
