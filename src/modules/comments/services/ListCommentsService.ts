import { inject, injectable } from 'tsyringe';
import { IComment } from '../domain/models/IComment';
import { ICommentsRepository } from '../domain/repositories/ICommentsRepository';

@injectable()
class ListCommentsService {
  constructor(
    @inject('CommentsRepository')
    private commentsRepository: ICommentsRepository,
  ) {}
  public async execute(book_id: string): Promise<IComment[]> {
    const comments = await this.commentsRepository.findAllByBook(book_id);
    return comments;
  }
}
export { ListCommentsService };
