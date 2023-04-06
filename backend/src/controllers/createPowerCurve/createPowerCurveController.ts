import {resolve} from "node:path";
import {Request, Response} from "express";
import {unlink} from "fs";
import {getRepository} from "typeorm";
import {promisify} from "util";
import {PowerCurve} from "../../models/PowerCurve";

export class CreatePowerCurveController {
  async handle(request: Request, response: Response) {
    try {
      const {name} = request.body;

      const {filename: file} = request.file as Express.Multer.File;

      const powerCurvesRepository = getRepository(PowerCurve);

      const powerCurve = powerCurvesRepository.create({name, file});

      await powerCurvesRepository.save(powerCurve);

      return response.status(201).json(powerCurve);
    } catch (error) {
      if (!request.file) {
        return response.status(400).json({erro: 'O campo foto é obrigatório'})
      }

      if (request.file) {
        const {filename: file} = request.file as Express.Multer.File

        if (process.env.STORAGE_TYPE === 'local') {
          promisify(unlink)(resolve(
            __dirname, '..', '..', `uploads/${file}`
          ))
        } else {
          promisify(unlink)(resolve(
            __dirname, '..', '..', '__tests__', 'uploads', `test/${file}`
          ))
        }
      }

      return response.status(400).json({erro: 'Erro ao criar curva de potência'})
    }
  }
}
