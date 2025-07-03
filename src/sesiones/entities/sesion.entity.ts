import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

export enum EstatusSesion {
  PENDIENTE = 'pendiente',
  REALIZADA = 'realizada',
  CANCELADA = 'cancelada',
}

@Entity('sesion')
export class Sesion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idPareja: number;

  @Column({ type: 'date' })
  fechaSesion: string;

  @Column('decimal', { precision: 10, scale: 2 })
  costo: number;

  @Column({ type: 'enum', enum: EstatusSesion, default: EstatusSesion.PENDIENTE })
  estatus: EstatusSesion;

  @Column({ type: 'text', nullable: true })
  notas: string;
} 