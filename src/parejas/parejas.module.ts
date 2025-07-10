import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParejasService } from './parejas.service';
import { ParejasController } from './parejas.controller';
import { Pareja } from './entities/pareja.entity';
import { BrokerModule } from 'src/broker/broker.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pareja]), BrokerModule],
  controllers: [ParejasController],
  providers: [ParejasService],
})
export class ParejasModule {}
