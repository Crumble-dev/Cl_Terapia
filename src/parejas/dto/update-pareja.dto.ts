import { PartialType } from '@nestjs/mapped-types';
import { CreateParejaDto } from './create-pareja.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { EstatusPareja } from '../entities/pareja.entity';

export class UpdateParejaDto {
  @IsOptional()
  @IsEnum(EstatusPareja)
  estatus?: EstatusPareja;

  @IsOptional()
  @IsString()
  objetivosTerapia?: string;
}
