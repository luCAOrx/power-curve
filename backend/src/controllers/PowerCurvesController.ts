import { Request, Response } from 'express';

import { getRepository } from 'typeorm';

import PowerCurve from '../models/PowerCurve';

import * as yup from 'yup';

export default {
  async index(request: Request, response: Response) {
    const powerCurvesRepository = getRepository(PowerCurve);

    const powerCurves = await powerCurvesRepository.find();

    return response.json(powerCurves);
  },

  async create(request: Request, response: Response) {
    const { name } = request.body;

    const requestFile = request.files as Express.Multer.File[];

    const files = requestFile.map(file => {
      return { 
        name: file.originalname,
        path: file.filename,
        size: file.size 
      }
    });

    const powerCurvesRepository = getRepository(PowerCurve);

    const data = { name, files };

    // const schema = yup.object().shape({
    //   name: yup.string().required().trim().min(5).max(50),
    //   files: yup.array(yup.object().shape({
    //     path: yup.string().required()
    //   }))
    // });

    // await schema.validate(data, {
    //   abortEarly: false
    // });
  
    const powerCurve = powerCurvesRepository.create(data);
  
    await powerCurvesRepository.save(powerCurve);
  
    return response.status(201).json(powerCurve);
  },
}