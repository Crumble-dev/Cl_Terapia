import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, BadRequestException } from '@nestjs/common';
import { ParejasService } from './parejas.service';
import { CreateParejaDto } from './dto/create-pareja.dto';
import { UpdateParejaDto } from './dto/update-pareja.dto';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Controller('parejas')
export class ParejasController {
  constructor(
    private readonly parejasService: ParejasService,
    private readonly httpService: HttpService,
  ) {}

  @Post()
  async create(@Body() createParejaDto: CreateParejaDto) {
    return await this.parejasService.create(createParejaDto);
  }

  @Get()
  async findAll() {
    return await this.parejasService.findAll();
  }

  @Get('detalle')
  async getParejasConMiembros() {
    console.log('>>> LLEGÓ AL ENDPOINT /parejas/detalle');
    // Usa el repositorio directamente para obtener los ids
    const parejas = await this.parejasService['parejaRepository'].find();
    const result = await Promise.all(
      parejas.map(async (p: any) => {
        console.log('>>> Procesando pareja:', p.id);
        const miembroA = await lastValueFrom(this.httpService.get(`https://auth-users-vgbg.onrender.com/usuario/${p.idParejaA}`)).then(r => r.data).catch(() => null);
        const miembroB = await lastValueFrom(this.httpService.get(`https://auth-users-vgbg.onrender.com/usuario/${p.idParejaB}`)).then(r => r.data).catch(() => null);
        return {
          id: p.id,
          estatus: p.estatus,
          objetivosTerapia: p.objetivosTerapia,
          fechaCreacion: p.fechaCreacion,
          miembros: [miembroA, miembroB],
        };
      })
    );
    console.log('>>> Resultado final /parejas/detalle:', result);
    return result;
  }

  @Get('detalle/:id')
  async getParejaDetalle(@Param('id') id: string) {
    console.log('>>> LLEGÓ AL ENDPOINT /parejas/detalle/:id con id:', id);
    const parejaId = Number(id);
    if (!id || isNaN(parejaId) || parejaId <= 0) {
      console.log('>>> ID inválido:', id);
      throw new BadRequestException('ID inválido');
    }
    // Buscar la pareja en la base de datos para obtener los ids de los miembros
    const parejaEntity = await this.parejasService['parejaRepository'].findOneBy({ id: parejaId });
    if (!parejaEntity) {
      console.log('>>> Pareja no encontrada para id:', parejaId);
      throw new NotFoundException('Pareja no encontrada');
    }
    console.log('>>> Pareja encontrada:', parejaEntity);
    const miembroA = await lastValueFrom(this.httpService.get(`https://auth-users-vgbg.onrender.com/usuario/${parejaEntity.idParejaA}`)).then(r => r.data).catch(() => null);
    const miembroB = await lastValueFrom(this.httpService.get(`https://auth-users-vgbg.onrender.com/usuario/${parejaEntity.idParejaB}`)).then(r => r.data).catch(() => null);
    const result = {
      id: parejaEntity.id,
      estatus: parejaEntity.estatus,
      objetivosTerapia: parejaEntity.objetivosTerapia,
      fechaCreacion: parejaEntity.fechaCreacion,
      miembros: [miembroA, miembroB],
    };
    console.log('>>> Resultado final /parejas/detalle/:id:', result);
    return result;
  }

  @Get('usuario/:usuarioId')
  async getParejasPorUsuario(@Param('usuarioId') usuarioId: string) {
    const id = Number(usuarioId);
    if (!usuarioId || isNaN(id) || id <= 0) {
      console.log('>>> ID de usuario inválido:', usuarioId);
      throw new BadRequestException('ID de usuario inválido');
    }
    const todas = await this.parejasService['parejaRepository'].find();
    console.log('>>> Todas las parejas en la BD:', todas);
    // Buscar todas las parejas donde el usuario es A o B
    const parejas = await this.parejasService['parejaRepository'].find({
      where: [{ idParejaA: id }, { idParejaB: id }],
    });
    if (!parejas.length) {
      console.log('>>> No se encontraron parejas para usuario:', id);
      throw new NotFoundException('No se encontraron parejas para este usuario');
    }
    // Para cada pareja, obtener los datos de los miembros usando el microservicio de usuarios
    const result = await Promise.all(
      parejas.map(async (p: any) => {
        // Petición HTTP para ambos miembros
        const miembroA = await lastValueFrom(this.httpService.get(`https://auth-users-vgbg.onrender.com/usuario/${p.idParejaA}`)).then(r => r.data).catch(() => null);
        const miembroB = await lastValueFrom(this.httpService.get(`https://auth-users-vgbg.onrender.com/usuario/${p.idParejaB}`)).then(r => r.data).catch(() => null);
        console.log('>>> miembroA:', JSON.stringify(miembroA));
        console.log('>>> miembroB:', JSON.stringify(miembroB));
        return {
          id: p.id,
          estatus: p.estatus,
          objetivosTerapia: p.objetivosTerapia,
          fechaCreacion: p.fechaCreacion,
          miembros: [miembroA, miembroB],
        };
      })
    );
    console.log('>>> Resultado de búsqueda por usuario:', result);
    return result;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const parejaId = Number(id);
    if (isNaN(parejaId)) throw new BadRequestException('ID inválido');
    return await this.parejasService.findOne(parejaId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParejaDto: UpdateParejaDto) {
    return this.parejasService.update(+id, updateParejaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parejasService.remove(+id);
  }
}
