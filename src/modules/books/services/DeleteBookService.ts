import AppError from '@shared/errors/AppError';
import { IDeleteBook } from '../domain/models/IDeleteBook';
import { injectable, inject } from 'tsyringe';
import { IBooksRepository } from '../domain/repositories/IBooksRepository';

@injectable()
class DeleteBookService {
  constructor(
    @inject('BooksRepository')
    private booksRepository: IBooksRepository,
  ) {}

  public async execute({ id }: IDeleteBook): Promise<void> {
    const book = await this.booksRepository.findById(id);

    if (!book) {
      throw new AppError('Book not found.');
    }

    await this.booksRepository.remove(book);
  }
}

export default DeleteBookService;
