import { inject, injectable } from 'tsyringe';
import { IUserPaginate } from '../domain/models/IPaginate';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

@injectable()
class ListUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<IUserPaginate> {
    const users = await this.usersRepository.findAllPaginate();

    return users;
  }
}

export default ListUserService;
