import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Book from '../infra/typeorm/entities/Book';
import { BookRepository } from '../infra/typeorm/repositories/BooksRepositories';

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
