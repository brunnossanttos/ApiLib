import { IHandleLike } from '@modules/likes/domain/models/IHandleLikes';
import { ILikesRepository } from '@modules/likes/domain/repositories/ILikesRepository';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Like } from '../entities/Like';

@EntityRepository(Like)
class LikesRepository implements ILikesRepository {
  private ormRepository: Repository<Like>;
  constructor() {
    this.ormRepository = getRepository(Like);
  }

  public async create({ book_id, user_id }: IHandleLike): Promise<Like> {
    const newLike = this.ormRepository.create({ book_id, user_id });
    await this.ormRepository.save(newLike);

    return newLike;
  }

  public async save(like: Like): Promise<Like> {
    await this.ormRepository.save(like);
    return like;
  }

  public async handle({ book_id, user_id }: IHandleLike): Promise<Like | void> {
    const likeExists = await this.ormRepository
      .createQueryBuilder('user_like')
      .where('user_id = :user_id', { user_id: user_id })
      .andWhere('book_id = :book_id', { book_id: book_id })
      .getOne();

    if (!likeExists) {
      const newLike = await this.ormRepository.create({
        is_like: true,
        book_id,
        user_id,
      });
      await this.ormRepository.save(newLike);
      return newLike;
    }

    if (likeExists && likeExists.is_like === true) {
      likeExists.is_like = false;
      await this.ormRepository.save(likeExists);
      return likeExists;
    }

    if (likeExists && likeExists.is_like === false) {
      likeExists.is_like = true;
      await this.ormRepository.save(likeExists);
      return likeExists;
    }
  }

  public async countLikes(book_id: string): Promise<number> {
    const likes = await this.ormRepository
      .createQueryBuilder('user_like')
      .where('book_id = :book_id', { book_id: book_id })
      .andWhere('is_like = :is_like', { is_like: true })
      .getCount();

    return likes;
  }
}
export { LikesRepository };
