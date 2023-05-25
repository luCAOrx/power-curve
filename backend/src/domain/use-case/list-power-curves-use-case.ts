import { type PowerCurve } from "@domain/entities/power-curve";
import { type PowerCurveRepository } from "@domain/repositories/power-curve-repository";

interface ListPowerCurvesUseCaseRequest {
  page?: number;
  takePage?: number;
}

type ListPowerCurvesUseCaseResponse = PowerCurve[];

export class ListPowerCurvesUseCase {
  constructor(private readonly powerCurveRepository: PowerCurveRepository) {}

  async execute({
    page = 1,
    takePage = 5,
  }: ListPowerCurvesUseCaseRequest): Promise<ListPowerCurvesUseCaseResponse> {
    const powerCurves = await this.powerCurveRepository.findMany(
      page,
      takePage
    );

    return powerCurves;
  }
}
