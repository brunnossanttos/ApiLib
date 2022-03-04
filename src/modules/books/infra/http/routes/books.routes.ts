import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';
import BooksController from '../controllers/BooksController';

const booksRouter = Router();
const booksController = new BooksController();

booksRouter.get('/', booksController.index);

booksRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  booksController.show,
);

booksRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      author: Joi.string().required(),
    },
  }),
  booksController.create,
);

booksRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      author: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  booksController.update,
);

booksRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  booksController.delete,
);

export default booksRouter;
