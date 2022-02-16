import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm';
import User from '../entities/User';

export class UserRepositories implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({
    name,
    username,
    email,
    password,
  }: ICreateUser): Promise<User> {
    const user = this.ormRepository.create({ name, username, email, password });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    await this.ormRepository.save(user);

    return user;
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
    const user = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  public async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        username,
      },
    });

    return user;
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

export default UserRepositories;
