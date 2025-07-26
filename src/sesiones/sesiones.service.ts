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
    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() + 7);
    return this.sesionRepository.find({
      where: {
        fechaHora: Between(new Date(), fechaLimite),
      },
      order: {
        fechaHora: 'ASC',
      },
    });
  }

  async findByPsychologist(psychologistId: number): Promise<Sesion[]> {
    return this.sesionRepository.find({
      where: { psychologistId },
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
