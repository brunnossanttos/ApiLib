import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import { ICreateUser } from '../domain/models/ICreateUser';
import User from '../infra/typeorm/entities/User';
import UserRepositories from '../infra/typeorm/repositories/UsersRepositories';

class CreateUserService {
  public async execute({
    name,
    username,
    email,
    password,
  }: ICreateUser): Promise<User> {
    const userRepository = getCustomRepository(UserRepositories);
    const emailExists = await userRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email addres already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      username,
      password: hashedPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
