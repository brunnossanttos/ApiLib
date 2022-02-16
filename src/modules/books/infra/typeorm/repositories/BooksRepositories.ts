import { ICreateBook } from '@modules/books/domain/models/ICreateBook';
import { IBooksRepository } from '@modules/books/domain/repositories/IBooksRepository';
import { getRepository, Repository } from 'typeorm';
import Book from '../entities/Book';

export class BookRepository implements IBooksRepository {
  private ormRepository: Repository<Book>;

  constructor() {
    this.ormRepository = getRepository(Book);
  }

  public async create({ title }: ICreateBook): Promise<Book> {
    const book = this.ormRepository.create({ title });

    await this.ormRepository.save(book);

    return book;
  }

  public async save(book: Book): Promise<Book> {
    await this.ormRepository.save(book);

    return book;
  }

  public async findByName(title: string): Promise<Book | undefined> {
    const book = this.ormRepository.findOne({
      where: {
        title,
      },
    });

    return book;
  }

  public async findById(id: string): Promise<Book | undefined> {
    const book = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return book;
  }
}
