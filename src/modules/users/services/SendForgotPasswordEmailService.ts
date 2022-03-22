import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ISendForgot } from '../domain/models/ISendForgot';
import path from 'path';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUsersTokensRepository } from '../domain/repositories/IUserTokenRepository';
import EtherealMail from '@config/mail/EtherealMail';

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokenRepository')
    private userTokensRepository: IUsersTokensRepository,
  ) {}

  public async execute({ email }: ISendForgot): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const token = await this.userTokensRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[LIB Personal] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
