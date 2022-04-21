import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IBook } from '../domain/models/IBook';
import { ICreateBook } from '../domain/models/ICreateBook';
import { IBooksRepository } from '../domain/repositories/IBooksRepository';

@injectable()
class CreateBookService {
  constructor(
    @inject('BooksRepository')
    private booksRepository: IBooksRepository,
  ) {}

  public async execute({ title, author }: ICreateBook): Promise<IBook> {
    const bookExists = await this.booksRepository.findByName(title);

    if (bookExists) {
      throw new AppError('There is already one book with this name');
    }

    const book = await this.booksRepository.create({
      title,
      author,
    });

    return book;
  }
}

export default CreateBookService;
