import { IsInt } from 'class-validator';

export class EnviarPreguntaDto {
  @IsInt()
  id: number;
} 