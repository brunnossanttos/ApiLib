import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IBook } from '../domain/models/IBook';
import { IUpdateBook } from '../domain/models/IUpdateBook';
import { IBooksRepository } from '../domain/repositories/IBooksRepository';

@injectable()
class UpdateBookService {
  constructor(
    @inject('BooksRepository')
    private booksRepository: IBooksRepository,
  ) {}

  public async execute({ id, title, author }: IUpdateBook): Promise<IBook> {
    const book = await this.booksRepository.findById(id);

    if (!book) {
      throw new AppError('Book not found.');
    }

    /* const booksExists = await this.booksRepository.findByName(title);

    if (booksExists) {
      throw new AppError('There is already one book with this name');
    } */

    book.title = title;
    book.author = author;

    await this.booksRepository.save(book);

    return book;
  }
}

export default UpdateBookService;
