import {Router} from 'express';

import multer from 'multer';

import uploadConfig from './config/upload';

import {CreatePowerCurveController} from './controllers/create-power-curve/create-power-curve-controller';
import {ListPowerCurvesController} from './controllers/list-power-curves/list-power-curve-controller';

const routes = Router();

const upload = multer(uploadConfig);

routes.get('/power_curve/list', new ListPowerCurvesController().handle);

routes.post('/power_curve/create', upload.single('file'), new CreatePowerCurveController().handle);

export default routes;
