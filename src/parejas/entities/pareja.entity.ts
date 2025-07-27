import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum EstatusPareja {
  ACTIVA = 'activa',
  INACTIVA = 'inactiva',
  FINALIZADA = 'finalizada',
}

@Entity()
export class Pareja {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idParejaA: number;

  @Column()
  idParejaB: number;

  @Column()
  psychologistId: number; // <-- Nuevo campo para el id del psicólogo

  @Column({ type: 'enum', enum: EstatusPareja, default: EstatusPareja.ACTIVA })
  estatus: EstatusPareja;

  @Column({ type: 'text' })
  objetivosTerapia: string;

  @CreateDateColumn({ type: 'timestamp' })
  fechaCreacion: Date;
}
