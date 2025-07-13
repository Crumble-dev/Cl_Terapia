import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateParejaDto } from './dto/create-pareja.dto';
import { UpdateParejaDto } from './dto/update-pareja.dto';
import { Pareja } from './entities/pareja.entity';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ParejasService {
  constructor(
    @InjectRepository(Pareja)
    private readonly parejaRepository: Repository<Pareja>,
    @Inject('NATS_SERVICE') private readonly natsService: ClientProxy, 
  ) {}

  async create(createParejaDto: CreateParejaDto): Promise<Pareja> {
    const pareja = this.parejaRepository.create(createParejaDto);
    return this.parejaRepository.save(pareja);
  }

  async findAll(): Promise<Pareja[]> {
    return this.parejaRepository.find();
  }

  async findOne(id: number): Promise<Pareja> {
    const pareja = await this.parejaRepository.findOneBy({ id });
    if (!pareja) throw new NotFoundException('Pareja no encontrada');
    return pareja;
  }

  async update(id: number, updateParejaDto: UpdateParejaDto): Promise<Pareja> {
    const pareja = await this.findOne(id);
    Object.assign(pareja, updateParejaDto);
    return this.parejaRepository.save(pareja);
  }

  async remove(id: number): Promise<{ idParejaA: number; idParejaB: number }> {
    const pareja = await this.findOne(id);
 
    const idPareja = pareja.id;
    const idParejaA = pareja.idParejaA;
    const idParejaB = pareja.idParejaB;
    await this.parejaRepository.remove(pareja);
    const payload = { idParejaA, idParejaB, idPareja };
    console.log('Enviando evento pareja_deleted con payload:', payload);
    this.natsService.emit('pareja_deleted', payload);
    return { idParejaA, idParejaB };
  }
}
