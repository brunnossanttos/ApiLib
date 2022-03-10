import { IComment } from '../models/IComment';
import { ICreateComment } from '../models/ICreateComment';

export interface ICommentsRepository {
  create(data: ICreateComment): Promise<IComment>;
  save(comment: IComment): Promise<IComment>;
  delete(comment: IComment): Promise<void>;
  findAllByBook(book_id: string): Promise<IComment[]>;
}
