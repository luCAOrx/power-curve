import {Request, Response} from 'express';
import {resolve} from 'node:path';
import {promisify} from 'node:util';
import {unlink} from 'node:fs';

import {getRepository} from 'typeorm';

import {PowerCurve} from '../models/PowerCurve';

export class PowerCurveController {
  async index(request: Request, response: Response) {
    try {
      const powerCurvesRepository = getRepository(PowerCurve);

      const powerCurves = await powerCurvesRepository.find();

      return response.status(200).json(powerCurves);
    } catch (error) {
      return response.status(400).json({error: 'Erro ao listar as curvas de potência'})
    }
  }

  async create(request: Request, response: Response) {
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
