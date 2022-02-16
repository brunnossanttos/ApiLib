import { IBook } from '../models/IBook';
import { ICreateBook } from '../models/ICreateBook';

export interface IBooksRepository {
  findByName(title: string): Promise<IBook | undefined>;
  create(data: ICreateBook): Promise<IBook>;
  save(book: IBook): Promise<IBook>;
}
