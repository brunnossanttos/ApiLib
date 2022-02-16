import { getCustomRepository } from 'typeorm';
import Book from '../infra/typeorm/entities/Book';
import { BookRepository } from '../infra/typeorm/repositories/BooksRepositories';

interface IPaginateBook {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: Book[];
}

class ListBookService {
  public async execute(): Promise<IPaginateBook> {
    const booksRepository = getCustomRepository(BookRepository);

    const books = await booksRepository.createQueryBuilder().paginate();

    return books as IPaginateBook;
  }
}

export default ListBookService;
