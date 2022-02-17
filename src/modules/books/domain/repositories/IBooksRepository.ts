import { IBook } from '../models/IBook';
import { IBookPaginate } from '../models/IBookPaginate';
import { ICreateBook } from '../models/ICreateBook';

export interface IBooksRepository {
  findByName(title: string): Promise<IBook | undefined>;
  findById(id: string): Promise<IBook | undefined>;
  findAll(): Promise<IBook[]>;
  findAllPaginate(): Promise<IBookPaginate>;
  remove(book: IBook): Promise<void>;
  create(data: ICreateBook): Promise<IBook>;
  save(book: IBook): Promise<IBook>;
}
