import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SesionesService } from './sesiones.service';
import { SesionesController } from './sesiones.controller';
import { Sesion } from './entities/sesion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sesion])],
  controllers: [SesionesController],
  providers: [SesionesService],
})
export class SesionesModule {}
