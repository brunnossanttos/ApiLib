import { v4 as uuidv4 } from 'uuid';
import { ICreateBook } from '@modules/books/domain/models/ICreateBook';
import { IBooksRepository } from '@modules/books/domain/repositories/IBooksRepository';
import { Book } from '@modules/books/infra/typeorm/entities/Book';
import { IBookPaginate } from '../../models/IPaginate';

class FakeBooksRepository implements IBooksRepository {
  private books: Book[] = [];

  public async create({ title, author }: ICreateBook): Promise<Book> {
    const book = new Book();

    book.id = uuidv4();
    book.title = title;
    book.author = author;

    this.books.push(book);

    return book;
  }

  public async save(book: Book): Promise<Book> {
    Object.assign(this.books, book);

    return book;
  }

  public async remove(book: Book): Promise<void> {}

  public async findAll(): Promise<Book[] | undefined> {
    return undefined;
  }

  public async findByName(title: string): Promise<Book | undefined> {
    const book = this.books.find(book => book.title === title);
    return book;
  }

  public async findById(id: string): Promise<Book | undefined> {
    const book = this.books.find(book => book.id === id);
    return book;
  }

  public async findAllPaginate(): Promise<IBookPaginate | undefined> {
    return undefined;
  }
}

export default FakeBooksRepository;
