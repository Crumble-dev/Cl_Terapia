import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreguntasService } from './preguntas.service';
import { PreguntasController } from './preguntas.controller';
import { Pregunta } from './entities/pregunta.entity';
import { Opcion } from './entities/opcion.entity';
import { Respuesta } from './entities/respuesta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pregunta, Opcion, Respuesta])],
  controllers: [PreguntasController],
  providers: [PreguntasService],
})
export class PreguntasModule {}
