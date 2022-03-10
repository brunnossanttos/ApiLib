import CreateBookService from '@modules/books/services/CreateBookService';
import DeleteBookService from '@modules/books/services/DeleteBookService';
import ListBookService from '@modules/books/services/ListBookService';
import ShowBookService from '@modules/books/services/ShowBookService';
import UpdateBookService from '@modules/books/services/UpdateBookService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

export default class BooksController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listBooks = container.resolve(ListBookService);

    const books = await listBooks.execute();

    return response.json(instanceToInstance(books));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showBook = container.resolve(ShowBookService);

    const books = await showBook.execute({ id });

    return response.json(instanceToInstance(books));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, author } = request.body;

    const createBook = container.resolve(CreateBookService);

    const book = await createBook.execute({
      title,
      author,
    });

    return response.json(instanceToInstance(book));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { title, author } = request.body;
    const { id } = request.params;

    const updateBook = container.resolve(UpdateBookService);

    const book = await updateBook.execute({
      id,
      title,
      author,
    });

    return response.json(instanceToInstance(book));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteBook = container.resolve(DeleteBookService);
    await deleteBook.execute({ id });

    return response.json([]);
  }
}
