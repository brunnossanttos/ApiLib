import { IBook } from '../models/IBook';
import { ICreateBook } from '../models/ICreateBook';
import { IBookPaginate } from '../models/IPaginate';

export interface IBooksRepository {
  findByName(title: string): Promise<IBook | undefined>;
  findById(id: string): Promise<IBook | undefined>;
  findAll(): Promise<IBook[] | undefined>;
  findAllPaginate(): Promise<IBookPaginate | undefined>;
  remove(book: IBook): Promise<void>;
  create(data: ICreateBook): Promise<IBook>;
  save(book: IBook): Promise<IBook>;
}
