import { Request, Response } from 'express';
import CreateBookService from '../../../services/CreateBookService';
import DeleteBookService from '../../../services/DeleteBookService';
import ListBookService from '../../../services/ListBookService';
import ShowBookService from '../../../services/ShowBookService';
import UpdateBookService from '../../../services/UpdateBookService';
import { container } from 'tsyringe';

export default class BooksController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listBooks = container.resolve(ListBookService);

    const books = await listBooks.execute();

    return response.json(books);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showBook = container.resolve(ShowBookService);

    const book = await showBook.execute({ id });

    return response.json(book);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, author, pages } = request.body;

    const createBook = container.resolve(CreateBookService);

    const book = await createBook.execute({
      title,
      author,
      pages,
      status: false,
    });

    return response.json(book);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { title, author, pages } = request.body;
    const { id } = request.params;

    const updateBook = container.resolve(UpdateBookService);

    const book = await updateBook.execute({
      id,
      title,
      author,
      pages,
      status: false,
    });

    return response.json(book);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteBook = container.resolve(DeleteBookService);
    await deleteBook.execute({ id });

    return response.json([]);
  }
}
