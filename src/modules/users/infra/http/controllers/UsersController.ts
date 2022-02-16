import { Request, Response } from 'express';
import CreateUserService from '../../../services/CreateUserService';
import ListUserService from '../../../services/ListUserService';
import ShowUserService from '../../../services/ShowUsersService';
import DeleteUserService from '../../../services/DeleteUserService';
import { instanceToInstance } from 'class-transformer';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = new ListUserService();

    const users = await listUsers.execute();

    return response.json(instanceToInstance(users));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showUser = new ShowUserService();

    const user = await showUser.execute({ id });

    return response.json(user);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, username, email, password } = request.body;
    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      username,
      email,
      password,
    });

    return response.json(instanceToInstance(user));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUser = new DeleteUserService();
    await deleteUser.execute({ id });

    return response.json([]);
  }
}
