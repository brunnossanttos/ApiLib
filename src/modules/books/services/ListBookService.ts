import { inject, injectable } from 'tsyringe';
import { IBooksRepository } from '../domain/repositories/IBooksRepository';
import { IBookPaginate } from '../domain/models/IBookPaginate';

@injectable()
class ListBookService {
  constructor(
    @inject('BookRepository')
    private booksRepository: IBooksRepository,
  ) {}

  public async execute(): Promise<IBookPaginate> {
    const books = await this.booksRepository.findAllPaginate();

    return books;
  }
}

export default ListBookService;
