import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Sesion } from './entities/sesion.entity';
import { CreateSesionDto } from './dto/create-sesion.dto';
import { UpdateSesionDto } from './dto/update-sesion.dto';

@Injectable()
export class SesionesService {
  constructor(
    @InjectRepository(Sesion)
    private readonly sesionRepository: Repository<Sesion>,
  ) {}

  async create(createSesionDto: CreateSesionDto): Promise<Sesion> {
    const sesion = this.sesionRepository.create(createSesionDto);
    return this.sesionRepository.save(sesion);
  }

  async findAll(): Promise<Sesion[]> {
    return this.sesionRepository.find();
  }

  async findProximas7Dias(): Promise<Sesion[]> {
    const hoy = new Date();
    const en7dias = new Date();
    en7dias.setDate(hoy.getDate() + 7);
    return this.sesionRepository.find({
      where: {
        fechaSesion: Between(hoy.toISOString().slice(0, 10), en7dias.toISOString().slice(0, 10)),
      },
    });
  }

  async update(id: number, updateSesionDto: UpdateSesionDto): Promise<Sesion> {
    const sesion = await this.sesionRepository.findOneBy({ id });
    if (!sesion) throw new NotFoundException('Sesión no encontrada');
    Object.assign(sesion, updateSesionDto);
    return this.sesionRepository.save(sesion);
  }

  async remove(id: number): Promise<void> {
    const sesion = await this.sesionRepository.findOneBy({ id });
    if (!sesion) throw new NotFoundException('Sesión no encontrada');
    await this.sesionRepository.remove(sesion);
  }
}
