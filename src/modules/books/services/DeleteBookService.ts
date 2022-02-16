import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { IDeleteBook } from '../domain/models/IDeleteBook';
import { BookRepository } from '../infra/typeorm/repositories/BooksRepositories';

class DeleteBookService {
  public async execute({ id }: IDeleteBook): Promise<void> {
    const booksRepository = getCustomRepository(BookRepository);

    const book = await booksRepository.findOne(id);

    if (!book) {
      throw new AppError('Book not found.');
    }

    await booksRepository.remove(book);
  }
}

export default DeleteBookService;
