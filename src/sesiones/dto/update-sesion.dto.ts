import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { EstatusSesion } from '../entities/sesion.entity';

export class UpdateSesionDto {
  @IsOptional()
  @IsDateString()
  fechaSesion?: string;

  @IsOptional()
  @IsNumber()
  costo?: number;

  @IsOptional()
  @IsEnum(EstatusSesion)
  estatus?: EstatusSesion;

  @IsOptional()
  @IsString()
  notas?: string;
} 