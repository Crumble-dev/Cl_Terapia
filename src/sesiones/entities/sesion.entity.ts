import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum EstatusSesion {
  PENDIENTE = 'pendiente',
  REALIZADA = 'realizada',
  CANCELADA = 'cancelada',
}

export enum SessionType {
  INDIVIDUAL = 'individual',
  PAREJA = 'pareja',
  GRUPAL = 'grupal',
}

export enum SessionStatus {
  ACTIVA = 'activa',
  FINALIZADA = 'finalizada',
  CANCELADA = 'cancelada',
}

@Entity('sesion')
export class Sesion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idPareja: number;

  @Column()
  psychologistId: number;

  @Column({ length: 255 })
  titulo: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'datetime' })
  fechaHora: Date;

  @Column()
  duracionMinutos: number;

  @Column({ type: 'enum', enum: SessionType })
  tipo: SessionType;

  @Column({ type: 'enum', enum: SessionStatus })
  estado: SessionStatus;

  @Column('decimal', { precision: 10, scale: 2 })
  costo: number;

  @Column({ type: 'text', nullable: true })
  notas: string;

  @Column({ type: 'text', nullable: true })
  objetivos: string;

  @CreateDateColumn({ type: 'timestamp' })
  creadoEn: Date;
}