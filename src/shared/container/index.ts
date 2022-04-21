import { container } from 'tsyringe';

import { BooksRepository } from '@modules/books/infra/typeorm/repositories/BooksRepository';
import { IBooksRepository } from '@modules/books/domain/repositories/IBooksRepository';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { ILikesRepository } from '@modules/likes/domain/repositories/ILikesRepository';
import { LikesRepository } from '@modules/likes/infra/typeorm/repositories/LikesRepository';
import { ICommentsRepository } from '@modules/comments/domain/repositories/ICommentsRepository';
import { CommentsRepository } from '@modules/comments/infra/typeorm/repositories/CommentsRepository';
import { IUsersTokensRepository } from '@modules/users/domain/repositories/IUserTokenRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository';

container.registerSingleton<IBooksRepository>(
  'BooksRepository',
  BooksRepository,
);
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ILikesRepository>(
  'LikesRepository',
  LikesRepository,
);

container.registerSingleton<ICommentsRepository>(
  'CommentsRepository',
  CommentsRepository,
);

container.registerSingleton<IUsersTokensRepository>(
  'UserTokenRepository',
  UserTokensRepository,
);
