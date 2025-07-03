import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';

export enum EstadoPregunta {
  CREADA = 'creada',
  ENVIADA = 'enviada',
  RESPONDIDA = 'respondida',
}

@Entity('preguntas')
export class Pregunta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pareja_id: number;

  @Column()
  creador_id: number;

  @Column()
  destinatario_id: number;

  @Column('text')
  texto_pregunta: string;

  @Column({ type: 'enum', enum: EstadoPregunta, default: EstadoPregunta.CREADA })
  estado: EstadoPregunta;

  @CreateDateColumn({ type: 'timestamp' })
  creado_en: Date;
} 