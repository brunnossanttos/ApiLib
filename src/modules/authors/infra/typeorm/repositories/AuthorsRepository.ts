import { IAuthorPaginate } from '@modules/authors/domain/models/IAuthorPaginate';
import { ICreateAuthor } from '@modules/authors/domain/models/ICreateAuthor';
import { IAuthorRepository } from '@modules/authors/domain/repositories/IAuthorsRepository';
import { getRepository, Repository } from 'typeorm';
import Author from '../entities/Author';

export class AuthorRepository implements IAuthorRepository {
  private ormRepository: Repository<Author>;

  constructor() {
    this.ormRepository = getRepository(Author);
  }

  public async create({ name }: ICreateAuthor): Promise<Author> {
    const author = this.ormRepository.create({ name });

    await this.ormRepository.save(author);

    return author;
  }

  public async save(author: Author): Promise<Author> {
    await this.ormRepository.save(author);

    return author;
  }

  public async remove(author: Author): Promise<void> {
    await this.ormRepository.save(author);
  }

  public async findByName(name: string): Promise<Author | undefined> {
    const author = this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return author;
  }

  public async findById(id: string): Promise<Author | undefined> {
    const author = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return author;
  }

  public async findAll(): Promise<Author[]> {
    const authors = this.ormRepository.find();

    return authors;
  }

  public async findAllPaginate(): Promise<IAuthorPaginate> {
    const authors = await this.ormRepository.createQueryBuilder().paginate();

    return authors as IAuthorPaginate;
  }
}
