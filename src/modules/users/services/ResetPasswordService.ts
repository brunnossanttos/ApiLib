import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { addHours, isAfter } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import { IResetPassword } from '../domain/models/IResetPassword';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUsersTokensRepository } from '../domain/repositories/IUserTokenRepository';

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokenRepository')
    private userTokensRepository: IUsersTokensRepository,
  ) {}

  public async execute({ token, password }: IResetPassword): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists.');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const tokenCreatedAt = userToken.created_at;
    const comparedate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), comparedate)) {
      throw new AppError('Token is expired');
    }

    user.password = await hash(password, 8);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
