import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateParejaDto } from './dto/create-pareja.dto';
import { UpdateParejaDto } from './dto/update-pareja.dto';
import { Pareja } from './entities/pareja.entity';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ParejasService {
  constructor(
    @InjectRepository(Pareja)
    private readonly parejaRepository: Repository<Pareja>,
    private readonly httpService: HttpService,
  ) {}

  private async getUsuarioById(id: number) {
    // Cambia la URL si tu microservicio de usuarios está en otro host/puerto
    const url = `http://localhost:5000/usuario/${id}`;
    try {
      const response = await lastValueFrom(this.httpService.get(url));
      return response.data;
    } catch (e) {
      return { id };
    }
  }

  async create(createParejaDto: CreateParejaDto) {
    const pareja = this.parejaRepository.create(createParejaDto);
    const saved = await this.parejaRepository.save(pareja);
    const miembroA = await this.getUsuarioById(saved.idParejaA);
    const miembroB = await this.getUsuarioById(saved.idParejaB);
    const result = {
      id: saved.id,
      estatus: saved.estatus,
      objetivosTerapia: saved.objetivosTerapia,
      fechaCreacion: saved.fechaCreacion,
      miembros: [miembroA, miembroB],
    };
    console.log('RESPUESTA QUE DEVUELVE EL SERVICIO:', result);
    return result;
  }

  async findAll() {
    const parejas = await this.parejaRepository.find();
    // Agregar datos de miembros a cada pareja
    const result = await Promise.all(
      parejas.map(async (p) => {
        const miembroA = await this.getUsuarioById(p.idParejaA);
        const miembroB = await this.getUsuarioById(p.idParejaB);
        return {
          id: p.id,
          estatus: p.estatus,
          objetivosTerapia: p.objetivosTerapia,
          fechaCreacion: p.fechaCreacion,
          miembros: [miembroA, miembroB],
        };
      })
    );
    return result;
  }

  async findOne(id: number) {
    const pareja = await this.parejaRepository.findOneBy({ id });
    if (!pareja) throw new NotFoundException('Pareja no encontrada');
    const miembroA = await this.getUsuarioById(pareja.idParejaA);
    const miembroB = await this.getUsuarioById(pareja.idParejaB);
    return {
      id: pareja.id,
      estatus: pareja.estatus,
      objetivosTerapia: pareja.objetivosTerapia,
      fechaCreacion: pareja.fechaCreacion,
      miembros: [miembroA, miembroB],
    };
  }

  async update(id: number, updateParejaDto: UpdateParejaDto) {
    const pareja = await this.parejaRepository.findOneBy({ id });
    if (!pareja) throw new NotFoundException('Pareja no encontrada');
    Object.assign(pareja, updateParejaDto);
    const saved = await this.parejaRepository.save(pareja);
    const miembroA = await this.getUsuarioById(saved.idParejaA);
    const miembroB = await this.getUsuarioById(saved.idParejaB);
    return {
      id: saved.id,
      estatus: saved.estatus,
      objetivosTerapia: saved.objetivosTerapia,
      fechaCreacion: saved.fechaCreacion,
      miembros: [miembroA, miembroB],
    };
  }

  async remove(id: number) {
    const pareja = await this.parejaRepository.findOneBy({ id });
    if (!pareja) throw new NotFoundException('Pareja no encontrada');
    await this.parejaRepository.remove(pareja);
    return { idParejaA: pareja.idParejaA, idParejaB: pareja.idParejaB };
  }

  async findByPsychologist(psychologistId: number) {
    const parejas = await this.parejaRepository.find({ where: { psychologistId } });
    return Promise.all(
      parejas.map(async (p) => {
        const miembroA = await this.getUsuarioById(p.idParejaA);
        const miembroB = await this.getUsuarioById(p.idParejaB);
        return {
          id: p.id,
          estatus: p.estatus,
          objetivosTerapia: p.objetivosTerapia,
          fechaCreacion: p.fechaCreacion,
          miembros: [miembroA, miembroB],
        };
      })
    );
  }
}
