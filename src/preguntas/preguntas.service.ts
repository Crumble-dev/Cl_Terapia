import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pregunta, EstadoPregunta } from './entities/pregunta.entity';
import { Opcion } from './entities/opcion.entity';
import { Respuesta } from './entities/respuesta.entity';
import { CreatePreguntaDto } from './dto/create-pregunta.dto';
import { CreateOpcionDto } from './dto/create-opcion.dto';
import { EnviarPreguntaDto } from './dto/enviar-pregunta.dto';
import { CreateRespuestaDto } from './dto/create-respuesta.dto';

@Injectable()
export class PreguntasService {
  constructor(
    @InjectRepository(Pregunta)
    private readonly preguntaRepo: Repository<Pregunta>,
    @InjectRepository(Opcion)
    private readonly opcionRepo: Repository<Opcion>,
    @InjectRepository(Respuesta)
    private readonly respuestaRepo: Repository<Respuesta>,
  ) {}

  async crearPregunta(dto: CreatePreguntaDto): Promise<Pregunta> {
    const pregunta = this.preguntaRepo.create(dto);
    return this.preguntaRepo.save(pregunta);
  }

  async añadirOpcion(dto: CreateOpcionDto): Promise<Opcion> {
    // Verifica que la pregunta exista
    const pregunta = await this.preguntaRepo.findOneBy({ id: dto.pregunta_id });
    if (!pregunta) throw new NotFoundException('Pregunta no encontrada');
    const opcion = this.opcionRepo.create(dto);
    return this.opcionRepo.save(opcion);
  }

  async enviarPregunta(id: number): Promise<Pregunta> {
    const pregunta = await this.preguntaRepo.findOneBy({ id });
    if (!pregunta) throw new NotFoundException('Pregunta no encontrada');
    pregunta.estado = EstadoPregunta.ENVIADA;
    return this.preguntaRepo.save(pregunta);
  }

  async responderPregunta(dto: CreateRespuestaDto): Promise<Respuesta> {
    const pregunta = await this.preguntaRepo.findOneBy({ id: dto.pregunta_id });
    if (!pregunta) throw new NotFoundException('Pregunta no encontrada');
    const opcion = await this.opcionRepo.findOneBy({ id: dto.opcion_seleccionada_id });
    if (!opcion) throw new NotFoundException('Opción no encontrada');
    const respuesta = this.respuestaRepo.create(dto);
    await this.respuestaRepo.save(respuesta);
    pregunta.estado = EstadoPregunta.RESPONDIDA;
    await this.preguntaRepo.save(pregunta);
    return respuesta;
  }

  async getPreguntasPorPareja(pareja_id: number): Promise<Pregunta[]> {
    return this.preguntaRepo.find({ where: { pareja_id } });
  }

  async getPreguntasPorCreador(creador_id: number): Promise<Pregunta[]> {
    return this.preguntaRepo.find({ where: { creador_id } });
  }

  async getPreguntasPorDestinatario(destinatario_id: number): Promise<Pregunta[]> {
    return this.preguntaRepo.find({ where: { destinatario_id } });
  }

  async getOpcionesPorPregunta(pregunta_id: number): Promise<Opcion[]> {
    return this.opcionRepo.find({ where: { pregunta_id } });
  }
}
