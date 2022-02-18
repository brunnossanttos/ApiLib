import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IDeleteAuthor } from '../domain/models/IDeleteAuthor';
import { IAuthorRepository } from '../domain/repositories/IAuthorsRepository';

@injectable()
class DeleteAuthorService {
  constructor(
    @inject('AuthorRepository')
    private authorsRepository: IAuthorRepository,
  ) {}

  public async execute({ id }: IDeleteAuthor): Promise<void> {
    const author = await this.authorsRepository.findById(id);

    if (!author) {
      throw new AppError('Author not found.');
    }

    await this.authorsRepository.remove(author);
  }
}

export default DeleteAuthorService;
