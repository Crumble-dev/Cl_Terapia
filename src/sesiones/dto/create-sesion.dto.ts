import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { EstatusSesion } from '../entities/sesion.entity';

export class CreateSesionDto {
  @IsNumber()
  idPareja: number;

  @IsDateString()
  fechaSesion: string;

  @IsNumber()
  costo: number;

  @IsOptional()
  @IsEnum(EstatusSesion)
  estatus?: EstatusSesion;

  @IsOptional()
  @IsString()
  notas?: string;
} 