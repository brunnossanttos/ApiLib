import isAuthenticated from '@shared/infra/http/middlewares/isAthenticated';
import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import CommentsController from '../../../../../modules/comments/infra/http/controllers/CommentsController';

const commentsRouter = Router();
const commentsController = new CommentsController();

commentsRouter.post(
  '/book/:book_id',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      comment: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      book_id: Joi.string().uuid().required(),
    },
  }),
  commentsController.create,
);

commentsRouter.get(
  '/book/:book_id',
  celebrate({
    [Segments.PARAMS]: { book_id: Joi.string().uuid().required() },
  }),
  commentsController.list,
);

export { commentsRouter };
