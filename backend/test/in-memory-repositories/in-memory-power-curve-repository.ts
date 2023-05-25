import { type PowerCurve } from "@domain/entities/power-curve";
import { type PowerCurveRepository } from "@domain/repositories/power-curve-repository";

export class InMemoryPowerCurveRepository implements PowerCurveRepository {
  public powerCurves: PowerCurve[] = [];

  async exists(name: string): Promise<boolean> {
    return this.powerCurves.some(
      (powerCurve) => powerCurve.props.name === name
    );
  }

  async create(powerCurve: PowerCurve): Promise<PowerCurve> {
    this.powerCurves.push(powerCurve);

    return powerCurve;
  }

  async findMany(page: number, takePage: number): Promise<PowerCurve[]> {
    const powerCurvesOrPowerCurve = this.powerCurves.map(
      (powerCurves) => powerCurves
    );

    return powerCurvesOrPowerCurve.slice(
      (page - 1) * takePage,
      page * takePage
    );
  }
}
