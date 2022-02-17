import Author from '@modules/authors/infra/http/typeorm/entities/Author';
import { IAuthor } from '../models/IAuthor';
import { IAuthorPaginate } from '../models/IAuthorPaginate';
import { ICreateAuthor } from '../models/ICreateAuthor';

export interface IAuthorRepository {
  findById(id: string): Promise<IAuthor | undefined>;
  findByName(title: string): Promise<IAuthor | undefined>;
  findAll(): Promise<Author[]>;
  findAllPaginate(): Promise<IAuthorPaginate>;
  remove(author: Author): Promise<void>;
  create(data: ICreateAuthor): Promise<IAuthor>;
  save(book: IAuthor): Promise<IAuthor>;
}
