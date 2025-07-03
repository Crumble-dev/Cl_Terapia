import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PreguntasService } from './preguntas.service';
import { CreatePreguntaDto } from './dto/create-pregunta.dto';
import { CreateOpcionDto } from './dto/create-opcion.dto';
import { EnviarPreguntaDto } from './dto/enviar-pregunta.dto';
import { CreateRespuestaDto } from './dto/create-respuesta.dto';

@Controller('preguntas')
export class PreguntasController {
  constructor(private readonly preguntasService: PreguntasService) {}

  @Post('crear')
  crearPregunta(@Body() dto: CreatePreguntaDto) {
    return this.preguntasService.crearPregunta(dto);
  }

  @Post('opcion')
  añadirOpcion(@Body() dto: CreateOpcionDto) {
    return this.preguntasService.añadirOpcion(dto);
  }

  @Post('enviar')
  enviarPregunta(@Body() dto: EnviarPreguntaDto) {
    return this.preguntasService.enviarPregunta(dto.id);
  }

  @Post('responder')
  responderPregunta(@Body() dto: CreateRespuestaDto) {
    return this.preguntasService.responderPregunta(dto);
  }

  @Get('pareja/:pareja_id')
  getPreguntasPorPareja(@Param('pareja_id') pareja_id: string) {
    return this.preguntasService.getPreguntasPorPareja(+pareja_id);
  }

  @Get('creador/:creador_id')
  getPreguntasPorCreador(@Param('creador_id') creador_id: string) {
    return this.preguntasService.getPreguntasPorCreador(+creador_id);
  }

  @Get('destinatario/:destinatario_id')
  getPreguntasPorDestinatario(@Param('destinatario_id') destinatario_id: string) {
    return this.preguntasService.getPreguntasPorDestinatario(+destinatario_id);
  }

  @Get('opciones/:pregunta_id')
  getOpcionesPorPregunta(@Param('pregunta_id') pregunta_id: string) {
    return this.preguntasService.getOpcionesPorPregunta(+pregunta_id);
  }
}
