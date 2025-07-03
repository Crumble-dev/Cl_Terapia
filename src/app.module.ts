import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParejasModule } from './parejas/parejas.module';
import { Pareja } from './parejas/entities/pareja.entity';
import { SesionesModule } from './sesiones/sesiones.module';
import { Sesion } from './sesiones/entities/sesion.entity'; 
import { PreguntasModule } from './preguntas/preguntas.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'test',
      entities: [Pareja, Sesion],
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
