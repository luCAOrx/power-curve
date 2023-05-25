import { type PowerCurve } from "../entities/power-curve";

export interface PowerCurveRepository {
  exists: (name: string) => Promise<boolean>;
  create: (powerCurve: PowerCurve) => Promise<PowerCurve>;
  findMany: (page: number, takePage: number) => Promise<PowerCurve[]>;
}
