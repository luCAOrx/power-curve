import {Request, Response, Router} from 'express';

import multer from 'multer';

import uploadConfig from './config/upload';

import {CreatePowerCurveController} from './controllers/create-power-curve/create-power-curve-controller';
import {ListPowerCurvesController} from './controllers/list-power-curves/list-power-curve-controller';

import {generateHTML, serve} from 'swagger-ui-express'

import {resolve} from 'node:path';
import {readFileSync} from 'node:fs';

const routes = Router();

const upload = multer(uploadConfig);

routes.use('/api-docs', serve)
routes.get('/api-docs', (request: Request, response: Response) => {
  return response.send(generateHTML(
    JSON.parse(
      readFileSync(resolve(__dirname, '..', '..', 'swagger.json')).toString()
    )
  ))
})

routes.get('/power_curve/list', new ListPowerCurvesController().handle);

routes.post('/power_curve/create', upload.single('file'), new CreatePowerCurveController().handle);

export default routes;
