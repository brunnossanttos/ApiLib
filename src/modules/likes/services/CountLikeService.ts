import { inject, injectable } from 'tsyringe';
import { ILikesRepository } from '../domain/repositories/ILikesRepository';

@injectable()
class CountLikesService {
  constructor(
    @inject('LikesRepository') private likesRepository: ILikesRepository,
  ) {}
  public async execute(book_id: string): Promise<number> {
    const qtdLikes = this.likesRepository.countLikes(book_id);

    return qtdLikes;
  }
}

export { CountLikesService };
