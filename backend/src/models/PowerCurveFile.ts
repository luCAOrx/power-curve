import { 
  Column, 
  Entity, 
  JoinColumn, 
  ManyToOne, 
  PrimaryGeneratedColumn 
} from "typeorm";

import PowerCurve from './PowerCurve';

@Entity('power_curves_files')
export default class PowerCurveFile {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  path: string;

  @Column()
  size: number;

  @ManyToOne(() => PowerCurve, powerCurve => powerCurve.files)
  @JoinColumn({ name: 'power_curve_id' })
  powerCurve: PowerCurve;
}