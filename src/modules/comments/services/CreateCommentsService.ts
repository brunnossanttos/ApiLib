import { inject, injectable } from 'tsyringe';
import { IComment } from '../domain/models/IComment';
import { ICreateComment } from '../domain/models/ICreateComment';
import { ICommentsRepository } from '../domain/repositories/ICommentsRepository';

@injectable()
class CreateCommentService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,
  ) {}
  public async execute({
    book_id,
    user_id,
    comment,
  }: ICreateComment): Promise<IComment> {
    const newComment = await this.commentsRepository.create({
      book_id,
      user_id,
      comment,
    });

    await this.commentsRepository.save(newComment);
    return newComment;
  }
}

export { CreateCommentService };
