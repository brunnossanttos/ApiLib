import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ICreateBook } from '../domain/models/ICreateBook';
import Book from '../infra/typeorm/entities/Book';
import { BookRepository } from '../infra/typeorm/repositories/BooksRepositories';

class CreateBookService {
  public async execute({ title, author, pages }: ICreateBook): Promise<Book> {
    const booksRepository = getCustomRepository(BookRepository);
    const bookExists = await booksRepository.findByName(title);

    if (bookExists) {
      throw new AppError('There is already one book with this name');
    }

    const book = booksRepository.create({
      title,
      author,
      pages,
      status: false,
    });

    await booksRepository.save(await book);

    return book;
  }
}

export default CreateBookService;
