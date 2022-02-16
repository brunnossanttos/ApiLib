import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { IUpdateBook } from '../domain/models/IUpdateBook';
import Book from '../infra/typeorm/entities/Book';
import { BookRepository } from '../infra/typeorm/repositories/BooksRepositories';

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
