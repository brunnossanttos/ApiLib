import AppError from '@shared/errors/AppError';
import { IBook } from '../domain/models/IBook';
import { ICreateBook } from '../domain/models/ICreateBook';
import { IBooksRepository } from '../domain/repositories/IBooksRepository';
import { injectable, inject } from 'tsyringe';

@injectable()
class CreateBookService {
  constructor(
    @inject('IBooksRepository')
    private booksRepository: IBooksRepository,
  ) {}

  public async execute({ title, author, pages }: ICreateBook): Promise<IBook> {
    const bookExists = await this.booksRepository.findByName(title);

    if (bookExists) {
      throw new AppError('There is already one book with this name');
    }

    const book = await this.booksRepository.create({
      title,
      author,
      pages,
      status: false,
    });

    return book;
  }
}

export default CreateBookService;
