import 'dotenv/config'

import 'express-async-errors';

import express from 'express';

import cors from 'cors';

import errorHandler from './errors/handler';

import routes from './routes';

export const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);
