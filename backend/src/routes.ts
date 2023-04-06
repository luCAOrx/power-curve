import {Router} from 'express';

import multer from 'multer';

import uploadConfig from './config/upload';

import PowerCurveValidation from './validations/PowerCurvesValidation';

import {PowerCurveController} from './controllers/PowerCurvesController';

const routes = Router();

const upload = multer(uploadConfig);

routes.get('/power_curve/list-all', new PowerCurveController().index);

routes.post('/power_curve/create',
  upload.single('file'),
  PowerCurveValidation.validate,
  new PowerCurveController().create,
);

export default routes;
