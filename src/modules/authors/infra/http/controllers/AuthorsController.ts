import { Request, Response } from 'express';
import CreateAuthorService from '@modules/authors/services/CreateAuthorService';
import DeleteAuthorService from '@modules/authors/services/DeleteAuthorService';
import ListAuthorService from '@modules/authors/services/ListAuthorService';
import ShowAuthorService from '@modules/authors/services/ShowAuthorService';
import UpdateAuthorService from '@modules/authors/services/UpdateAuthorService';
import { container } from 'tsyringe';

export default class AuthorsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listAuthor = container.resolve(ListAuthorService);

    const authors = await listAuthor.execute();

    return response.json(authors);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showAuthor = container.resolve(ShowAuthorService);

    const author = await showAuthor.execute({ id });

    return response.json(author);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createAuthor = container.resolve(CreateAuthorService);

    const author = await createAuthor.execute({
      name,
    });

    return response.json(author);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const { id } = request.params;

    const updateAuthor = container.resolve(UpdateAuthorService);

    const author = await updateAuthor.execute({
      id,
      name,
    });

    return response.json(author);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteAuthor = container.resolve(DeleteAuthorService);
    await deleteAuthor.execute({ id });

    return response.json([]);
  }
}
