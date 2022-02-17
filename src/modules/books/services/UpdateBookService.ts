import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IUpdateBook } from '../domain/models/IUpdateBook';
import { IBooksRepository } from '../domain/repositories/IBooksRepository';
import { IBook } from '../domain/models/IBook';

class UpdateBookService {
  public async execute({
    id,
    title,
    author,
    pages,
    status,
  }: IUpdateBook): Promise<Book> {
    const booksRepository = getCustomRepository(BookRepository);

    const book = await booksRepository.findOne(id);

    if (!book) {
      throw new AppError('Book not found.');
    }

    const bookExists = await booksRepository.findByName(title);

    if (bookExists && title != book.title) {
      throw new AppError('There is already one book with this name');
    }

    book.title = title;
    book.author = author;
    book.pages = pages;
    book.status = status;

    await booksRepository.save(book);
    return book;
  }
}

export default UpdateBookService;
