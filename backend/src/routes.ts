import { Router } from 'express';

import multer from 'multer';

import uploadConfig from './config/upload';

import PowrtCurvesValitdation from './validations/PowerCurvesValidation';

import PowerCurvesController from './controllers/PowerCurvesController';

const routes = Router();

const upload = multer(uploadConfig);

routes.get('/power_curves', PowerCurvesController.index);

routes.post('/power_curves', 
  PowrtCurvesValitdation.validate,
  upload.array('files', 1), 
  PowerCurvesController.create,
);

export default routes;