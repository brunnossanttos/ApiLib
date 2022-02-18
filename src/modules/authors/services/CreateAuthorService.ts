import AppError from '@shared/errors/AppError';
import { IAuthor } from '../domain/models/IAuthor';
import { ICreateAuthor } from '../domain/models/ICreateAuthor';
import { IAuthorRepository } from '../domain/repositories/IAuthorsRepository';
import { injectable, inject } from 'tsyringe';

@injectable()
class CreateAuthorService {
  constructor(
    @inject('AuthorRepository')
    private authorsRepository: IAuthorRepository,
  ) {}

  public async execute({ name }: ICreateAuthor): Promise<IAuthor> {
    const authorExists = await this.authorsRepository.findByName(name);

    if (authorExists) {
      throw new AppError('There is already one author with this name');
    }

    const author = await this.authorsRepository.create({
      name,
    });

    return author;
  }
}

export default CreateAuthorService;
