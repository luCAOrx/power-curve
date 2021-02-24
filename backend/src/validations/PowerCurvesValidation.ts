import { NextFunction, Request, Response } from "express";

import * as yup from 'yup';

export default {
  async validate(request: Request, response: Response, next: NextFunction) {
    const { name } = request.body;
  
    const files = request.files;
  
    const data = { name, files };
  
    const schema = yup.object().shape({
      name: yup.string().min(5).max(50),
      files: yup.array(yup.object().shape({
        path: yup.string()
      }))
    });
  
    await schema.validate(data, {
      abortEarly: false
    });

    next();

  }
}