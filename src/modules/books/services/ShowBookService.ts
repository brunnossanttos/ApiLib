import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Book from '../typeorm/entities/Book';
import { BookRepository } from '../typeorm/repositories/BooksRepository';

interface IRequest {
  id: string;
}

class ShowBookService {
  public async execute({ id }: IRequest): Promise<Book> {
    const booksRepository = getCustomRepository(BookRepository);

    const book = await booksRepository.findOne(id);

    if (!book) {
      throw new AppError('Book not found.');
    }

    return book;
  }
}

export default ShowBookService;
