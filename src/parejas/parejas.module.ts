import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParejasService } from './parejas.service';
import { ParejasController } from './parejas.controller';
import { Pareja } from './entities/pareja.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pareja])],
  controllers: [ParejasController],
  providers: [ParejasService],
})
export class ParejasModule {}
