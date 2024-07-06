import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan'

import { ApiError, errorLog } from '../helpers';
import routerApiV1 from './v1';
import { errorHandler } from '../helpers/errorHandler';



try {


  //For env File
  dotenv.config();
  const port = process.env.PORT || 3000;

  const app: Application = express();

  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());

  // Puerto de la app

  routerApiV1(app);

  app.use(errorHandler);

  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
