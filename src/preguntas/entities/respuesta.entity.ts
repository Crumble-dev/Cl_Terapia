import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('respuestas')
export class Respuesta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pregunta_id: number;

  @Column()
  opcion_seleccionada_id: number;

  @Column()
  respondido_por_id: number;

  @CreateDateColumn({ type: 'timestamp' })
  respondido_en: Date;
} 