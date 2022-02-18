import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IUpdateAuthor } from '../domain/models/IUpdateAuthor';
import { IAuthorRepository } from '../domain/repositories/IAuthorsRepository';
import { IAuthor } from '../domain/models/IAuthor';

@injectable()
class UpdateAuthorService {
  constructor(
    @inject('AuthorsRepository')
    private authorsRepository: IAuthorRepository,
  ) {}

  public async execute({ id, name }: IUpdateAuthor): Promise<IAuthor> {
    const author = await this.authorsRepository.findById(id);

    if (!author) {
      throw new AppError('Author not found.');
    }

    const authorExists = await this.authorsRepository.findByName(name);

    if (authorExists) {
      throw new AppError('There is already one author with this name');
    }

    author.id = id;
    author.name = name;

    await this.authorsRepository.save(author);

    return author;
  }
}

export default UpdateAuthorService;
