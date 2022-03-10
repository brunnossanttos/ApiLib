import booksRouter from '@modules/books/infra/http/routes/books.routes';
import { commentsRouter } from '@modules/comments/infra/http/routes/comments.routes';
import { likesRouter } from '@modules/likes/infra/http/routes/likes.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/books', booksRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/likes', likesRouter);
routes.use('/comments', commentsRouter);

export default routes;
