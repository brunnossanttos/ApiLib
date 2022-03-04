import isAuthenticated from '@shared/infra/http/middlewares/isAthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { LikesController } from '../controllers/LikesController';

const likesRouter = Router();
const likesController = new LikesController();

likesRouter.post(
  '/books/:book_id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      book_id: Joi.string().uuid().required(),
      // user_id: Joi.string().uuid().required(),
    },
  }),
  likesController.create,
);
likesRouter.get(
  '/book/:book_id',
  celebrate({
    [Segments.PARAMS]: { book_id: Joi.string().uuid().required() },
  }),
  likesController.countLikes,
);

export { likesRouter };
