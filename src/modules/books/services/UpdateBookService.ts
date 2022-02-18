import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IUpdateBook } from '../domain/models/IUpdateBook';
import { IBooksRepository } from '../domain/repositories/IBooksRepository';
import { IBook } from '../domain/models/IBook';

@injectable()
class UpdateBookService {
  constructor(
    @inject('ProductsRepository')
    private booksRepository: IBooksRepository,
  ) {}

  public async execute({
    id,
    title,
    author,
    pages,
    status,
  }: IUpdateBook): Promise<IBook> {
    const book = await this.booksRepository.findById(id);

    if (!book) {
      throw new AppError('Book not found.');
    }

    const bookExists = await this.booksRepository.findByName(title);

    if (bookExists) {
      throw new AppError('There is already one book with this name');
    }

    book.title = title;
    book.author = author;
    book.pages = pages;
    book.status = status;

    await this.booksRepository.save(book);

    return book;
  }
}

export default UpdateBookService;
