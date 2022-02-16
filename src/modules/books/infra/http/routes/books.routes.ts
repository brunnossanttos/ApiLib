import { Router } from 'express';
import BooksController from '../controllers/BooksController';
import { celebrate, Joi, Segments } from 'celebrate';

const booksRouter = Router();
const booksControler = new BooksController();

booksRouter.get('/', booksControler.index);

booksRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  booksControler.show,
);

booksRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      author: Joi.string().required(),
      pages: Joi.number().required(),
    },
  }),
  booksControler.create,
);

booksRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      author: Joi.string().required(),
      pages: Joi.number().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  booksControler.update,
);

booksRouter.delete('/:id', booksControler.delete);

export default booksRouter;
