import { inject, injectable } from 'tsyringe';
import { IBookPaginate } from '../domain/models/IPaginate';
import { IBooksRepository } from '../domain/repositories/IBooksRepository';

@injectable()
class ListBookService {
  constructor(
    @inject('BooksRepository')
    private booksRepository: IBooksRepository,
  ) {}

  public async execute(): Promise<IBookPaginate> {
    const books = await this.booksRepository.findAllPaginate();

    return books;
  }
}

export default ListBookService;
