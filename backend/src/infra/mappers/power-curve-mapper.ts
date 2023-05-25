import { PowerCurve } from "@domain/entities/power-curve";
import { type PowerCurve as PowerCurves } from "@prisma/client";

interface ToPersistenceResponse {
  id: string;
  name: string;
  file: string;
  created_at: Date;
}

export class PowerCurveMapper {
  static toDomain(raw: PowerCurves): PowerCurve {
    return PowerCurve.create(
      {
        name: raw.name,
        file: raw.file,
      },
      raw.id
    );
  }

  static toPersistence(powerCurve: PowerCurve): ToPersistenceResponse {
    return {
      id: powerCurve.id,
      name: powerCurve.props.name,
      file: powerCurve.props.file,
      created_at: powerCurve.created_at,
    };
  }
}
