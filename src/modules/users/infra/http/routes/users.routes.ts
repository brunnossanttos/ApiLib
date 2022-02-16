import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import isAuthenticated from '@shared/infra/http/middlewares/isAthenticated';

const usersRouter = Router();
const usersControler = new UsersController();

usersRouter.get('/', isAuthenticated, usersControler.index);
usersRouter.get('/', usersControler.show);
usersRouter.post('/', usersControler.create);
usersRouter.delete('/:id', usersControler.delete);

export default usersRouter;
