import { IBooksRepository } from '@modules/books/domain/repositories/IBooksRepository';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IHandleLike } from '../domain/models/IHandleLikes';
import { ILike } from '../domain/models/ILike';
import { ILikesRepository } from '../domain/repositories/ILikesRepository';

@injectable()
class HandleLikesService {
  constructor(
    @inject('LikesRepository') private likesRepository: ILikesRepository,
    @inject('BooksRepository')
    private booksRepository: IBooksRepository,
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}
  public async execute({
    book_id,
    user_id,
  }: IHandleLike): Promise<ILike | void> {
    const book = await this.booksRepository.findById(book_id);
    const user = await this.usersRepository.findById(user_id);
    if (!book || !user) {
      throw new AppError('Book or user not found', 404);
    }

    const like = await this.likesRepository.handle({ book_id, user_id });

    return like;
  }
}
export { HandleLikesService };
