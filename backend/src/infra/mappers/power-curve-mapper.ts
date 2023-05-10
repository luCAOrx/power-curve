import {PowerCurve as PowerCurves} from "@prisma/client";
import {PowerCurve} from '@domain/entities/power-curve';

export class PowerCurveMapper {
  static toDomain(raw: PowerCurves): PowerCurve {
    return PowerCurve.create({
      name: raw.name,
      file: raw.file
    },
      raw.id,
    )
  }

  static toPersistence(powerCurve: PowerCurve) {
    return {
      id: powerCurve.id,
      name: powerCurve.props.name,
      file: powerCurve.props.file,
      created_at: powerCurve.created_at
    }
  }
}
