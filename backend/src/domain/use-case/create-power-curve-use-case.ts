import {PowerCurve} from "../entities/power-curve";
import {PowerCurveRepository} from "../repositories/power-curve-repository";
import {PowerCurveAlreadyExists} from "./errors/power-curve-already-exists";

type CreatePowerCurveUseCaseRequest = {
  name: string;
  file: string;
}

type CreatePowerCurveUseCaseResponse = PowerCurve

export class CreatePowerCurveUseCase {
  constructor(private powerCurveRepository: PowerCurveRepository) {}

  async execute({name, file}: CreatePowerCurveUseCaseRequest): Promise<CreatePowerCurveUseCaseResponse> {
    const powerCurve = PowerCurve.create({name, file})

    const powerCurveNameAlreadyExists = await this.powerCurveRepository.exists(powerCurve.props.name)

    if (powerCurveNameAlreadyExists) throw new PowerCurveAlreadyExists()

    await this.powerCurveRepository.create(powerCurve)

    return powerCurve
  }
}
