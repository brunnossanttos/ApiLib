import booksRouter from '@modules/books/infra/http/routes/books.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import authorsRouter from '@modules/authors/infra/http/routes/authors.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/books', booksRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/authors', authorsRouter);

export default routes;
