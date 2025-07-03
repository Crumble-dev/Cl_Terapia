import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateParejaDto } from './dto/create-pareja.dto';
import { UpdateParejaDto } from './dto/update-pareja.dto';
import { Pareja } from './entities/pareja.entity';

@Injectable()
export class ParejasService {
  constructor(
    @InjectRepository(Pareja)
    private readonly parejaRepository: Repository<Pareja>,
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
    await this.parejaRepository.remove(pareja);
    return { idParejaA: pareja.idParejaA, idParejaB: pareja.idParejaB };
  }
}
