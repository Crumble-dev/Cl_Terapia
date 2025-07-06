import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParejasModule } from './parejas/parejas.module';
import { SesionesModule } from './sesiones/sesiones.module';
import { PreguntasModule } from './preguntas/preguntas.module';
import { Pareja } from './parejas/entities/pareja.entity';
import { Sesion } from './sesiones/entities/sesion.entity';
import { Pregunta } from './preguntas/entities/pregunta.entity';
import { Opcion } from './preguntas/entities/opcion.entity';
import { Respuesta } from './preguntas/entities/respuesta.entity';
import { envs } from './config/envs';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: envs.database.host,
      port: envs.database.port,
      username: envs.database.username,
      password: envs.database.password,
      database: envs.database.database,
      entities: [Pareja, Sesion, Pregunta, Opcion, Respuesta],
      synchronize: true, // Solo para desarrollo
    }),
    ParejasModule,
    SesionesModule,
    PreguntasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
