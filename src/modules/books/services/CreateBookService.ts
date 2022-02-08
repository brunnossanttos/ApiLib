import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Book from '../typeorm/entities/Book';
import { BookRepository } from '../typeorm/repositories/BooksRepository';

interface IRequest {
  title: string;
  author: string;
  pages: number;
  status: boolean;
}

class CreateBookService {
  public async execute({
    title,
    author,
    pages,
    status,
  }: IRequest): Promise<Book> {
    const booksRepository = getCustomRepository(BookRepository);
    const bookExists = await booksRepository.findByName(title);

    if (bookExists) {
      throw new AppError('There is already one book with this name');
    }

    const book = booksRepository.create({
      title,
      author,
      pages,
      status,
    });

    await booksRepository.save(book);

    return book;
  }
}

export default CreateBookService;
