import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IUserPaginate } from '@modules/users/domain/models/IPaginate';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm';
import { User } from '../entities/Users';

export class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({ name, email, password }: ICreateUser): Promise<User> {
    const user = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    await this.ormRepository.save(user);

    return user;
  }

  public async remove(user: User): Promise<void> {
    await this.ormRepository.remove(user);
  }

  public async findByName(name: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  public async findAll(): Promise<User[]> {
    const user = this.ormRepository.find();

    return user;
  }

  public async findAllPaginate(): Promise<IUserPaginate> {
    const users = await this.ormRepository.createQueryBuilder().paginate();

    return users as IUserPaginate;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }
}
