import { 
  Column, 
  Entity, 
  JoinColumn, 
  OneToMany, 
  PrimaryGeneratedColumn 
} from "typeorm";

import PowerCurveFile from './PowerCurveFile';

@Entity('power_curves')
export default class PowerCurve {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @OneToMany(() => PowerCurveFile, file => file.powerCurve, {
    cascade: ['insert']
  })
  @JoinColumn({ name: 'power_curve_id' })
  files: PowerCurveFile[];
}