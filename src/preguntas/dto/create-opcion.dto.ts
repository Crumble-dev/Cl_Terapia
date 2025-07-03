import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateOpcionDto {
  @IsInt()
  pregunta_id: number;

  @IsString()
  @IsNotEmpty()
  texto_opcion: string;

  @IsBoolean()
  es_correcta: boolean;
} 