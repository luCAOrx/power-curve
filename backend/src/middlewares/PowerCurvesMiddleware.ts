import { NextFunction, Request, Response } from 'express';

import * as yup from 'yup';

const validation = (schema: yup.BaseSchema) => 
  async (request: Request, response: Response, next: NextFunction) => {
    const { name } = request.body;

    const requestFile = request.files as Express.Multer.File[];

    const files = requestFile.map(file => {
      return { path: file.filename }
    });

    const data = { name, files };

    await schema.validate(data, {
      abortEarly: false
    });

    next();
  }

export default validation;