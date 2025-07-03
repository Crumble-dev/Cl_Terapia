import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreatePreguntaDto {
  @IsInt()
  pareja_id: number;

  @IsInt()
  creador_id: number;

  @IsInt()
  destinatario_id: number;

  @IsString()
  @IsNotEmpty()
  texto_pregunta: string;
} 