import { IsInt } from 'class-validator';

export class CreateRespuestaDto {
  @IsInt()
  pregunta_id: number;

  @IsInt()
  opcion_seleccionada_id: number;

  @IsInt()
  respondido_por_id: number;
} 