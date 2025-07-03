import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';

@Entity('opciones')
export class Opcion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pregunta_id: number;

  @Column({ length: 255 })
  texto_opcion: string;

  @Column({ type: 'boolean', default: false })
  es_correcta: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  creado_en: Date;
} 