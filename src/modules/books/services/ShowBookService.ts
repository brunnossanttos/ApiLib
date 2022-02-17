import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IBooksRepository } from '../domain/repositories/IBooksRepository';
import { IShowBook } from '../domain/models/IShowBook';
import { IBook } from '../domain/models/IBook';

@injectable()
class ShowBookService {
  constructor(
    @inject('BooksRepository')
    private booksRepository: IBooksRepository,
  ) {}

  public async execute({ id }: IShowBook): Promise<IBook> {
    const book = await this.booksRepository.findById(id);

    if (!book) {
      throw new AppError('Book not found.');
    }

    return book;
  }
}

export default ShowBookService;
