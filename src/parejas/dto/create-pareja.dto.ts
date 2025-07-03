import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { EstatusPareja } from '../entities/pareja.entity';

export class CreateParejaDto {
  @IsNumber()
  idParejaA: number;

  @IsNumber()
  idParejaB: number;

  @IsOptional()
  @IsEnum(EstatusPareja)
  estatus?: EstatusPareja;

  @IsString()
  @IsNotEmpty()
  objetivosTerapia: string;
}

