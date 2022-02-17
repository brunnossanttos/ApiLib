import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IAuthorRepository } from '../domain/repositories/IAuthorRepository';
import { IShowAuthor } from '../domain/models/IShowAuthor';
import { IAuthor } from '../domain/models/IAuthor';

@injectable()
class ShowAuthorService {
  constructor(
    @inject('AuthorsRepository')
    private authorsRepository: IAuthorRepository,
  ) {}

  public async execute({ id }: IShowAuthor): Promise<IAuthor> {
    const author = await this.authorsRepository.findById(id);

    if (!author) {
      throw new AppError('Author not found.');
    }

    return author;
  }
}

export default ShowAuthorService;
