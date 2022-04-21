import { IHandleLike } from '../models/IHandleLikes';
import { ILike } from '../models/ILike';

export interface ILikesRepository {
  handle(data: IHandleLike): Promise<ILike | void>;
  save(comment: ILike): Promise<ILike>;
  countLikes(promotion_id: string): Promise<number>;
}
