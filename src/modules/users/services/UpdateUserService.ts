import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { IUpdateUser } from '../domain/models/IUpdateUser';
import { IUser } from '../domain/models/IUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    id,
    name,
    email,
    password,
    old_password,
  }: IUpdateUser): Promise<IUser> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const userUpdateEmail = await this.usersRepository.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id !== id) {
      throw new AppError('There is already one user with this email.');
    }

    if (password && !old_password) {
      throw new AppError('Old password is required.');
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
