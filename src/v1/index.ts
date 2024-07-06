import { Application } from 'express';
import router from './routes/lifeInsurance';

function routerApiV1(app: Application) {
  
  app.use(
    '/api/v1',
    router
  );
}

export default routerApiV1;
