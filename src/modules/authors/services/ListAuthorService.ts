import { inject, injectable } from 'tsyringe';
import { IAuthorRepository } from '../domain/repositories/IAuthorRepository';
import { IAuthorPaginate } from '../domain/models/IAuthorPaginate';

@injectable()
class ListAuthorService {
  constructor(
    @inject('AuthorsRepository')
    private authorsRepository: IAuthorRepository,
  ) {}

  public async execute(): Promise<IAuthorPaginate> {
    const products = await this.authorsRepository.findAllPaginate();

    return products;
  }
}

export default ListAuthorService;
