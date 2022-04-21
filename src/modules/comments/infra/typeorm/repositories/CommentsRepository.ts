import { ICreateComment } from '@modules/comments/domain/models/ICreateComment';
import { ICommentsRepository } from '@modules/comments/domain/repositories/ICommentsRepository';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Comment } from '../entities/Comment';

@EntityRepository(Comment)
class CommentsRepository implements ICommentsRepository {
  private ormRepository: Repository<Comment>;
  constructor() {
    this.ormRepository = getRepository(Comment);
  }

  public async create({
    book_id,
    user_id,
    comment,
  }: ICreateComment): Promise<Comment> {
    const newComment = this.ormRepository.create({
      book_id,
      user_id,
      comment,
    });
    return newComment;
  }

  public async save(comment: Comment): Promise<Comment> {
    await this.ormRepository
      .createQueryBuilder()
      .insert()
      .into('books_user_comments')
      .values(comment)
      .execute();
    return comment;
  }

  public async delete(comment: Comment): Promise<void> {
    await this.ormRepository.remove(comment);
  }

  public async findAllByBook(book_id: string): Promise<Comment[]> {
    const comments = this.ormRepository
      .createQueryBuilder('book_user_comments')
      .leftJoinAndSelect('book_user_comments.user', 'user')
      .where('book_id = :book_id', { book_id: book_id })
      // .select(['promotion_user_comments.users.username', 'promotion_user_comments.users.avatar'])
      .getMany();

    return comments;
  }
}

export { CommentsRepository };
