import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {PowerCurve} from "../../models/PowerCurve";

export class ListAllPowerCurveController {
  async handle(request: Request, response: Response) {
    try {
      const powerCurvesRepository = getRepository(PowerCurve);

      const powerCurves = await powerCurvesRepository.find();

      return response.status(200).json(powerCurves);
    } catch (error) {
      return response.status(400).json({error: 'Erro ao listar as curvas de potência'})
    }
  }

}
