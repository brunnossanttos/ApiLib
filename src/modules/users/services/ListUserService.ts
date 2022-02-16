import { getCustomRepository } from 'typeorm';
import User from '../infra/typeorm/entities/User';
import UserRepositories from '../infra/typeorm/repositories/UsersRepositories';

class ListUserService {
  public async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UserRepositories);

    const users = usersRepository.find();

    return users;
  }
}

export default ListUserService;
