import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import 'express-async-errors';
import { errors } from 'celebrate';
import { pagination } from 'typeorm-pagination';
import AppError from '@shared/errors/AppError';
import routes from './routes';
import '@shared/infra/typeorm';
import '@shared/container';
import swaggerDocs from '../../../../swagger.json';

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(pagination);

app.use(routes);

app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }
    return response.status(500).json({
      status: 'error',
      message: error.stack,
    });
  },
);

app.listen(3333, () => {
  console.log('Server started on port 3333! 🏆');
});
