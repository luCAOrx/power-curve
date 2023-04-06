import {Router} from 'express';

import multer from 'multer';

import uploadConfig from './config/upload';

import PowerCurveValidation from './validations/PowerCurvesValidation';

import {CreatePowerCurveController} from './controllers/createPowerCurve/createPowerCurveController';
import {ListAllPowerCurveController} from './controllers/listAllPowerCurve/listAllPowerCurveController';

const routes = Router();

const upload = multer(uploadConfig);

routes.get('/power_curve/list-all', new ListAllPowerCurveController().handle);

routes.post('/power_curve/create',
  upload.single('file'),
  PowerCurveValidation.validate,
  new CreatePowerCurveController().handle,
);

export default routes;
