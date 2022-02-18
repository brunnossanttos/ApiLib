import { Router } from 'express';
import AuthorsController from '../controllers/AuthorsController';
import { celebrate, Joi, Segments } from 'celebrate';

const authorsRouter = Router();
const authorsControler = new AuthorsController();

authorsRouter.get('/', authorsControler.index);

authorsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  authorsControler.show,
);

authorsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  authorsControler.create,
);

authorsRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  authorsControler.update,
);

authorsRouter.delete('/:id', authorsControler.delete);

export default authorsRouter;
