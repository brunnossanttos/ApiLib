import { container } from 'tsyringe';

import { IBooksRepository } from '@modules/books/domain/repositories/IBooksRepository';
import { BookRepository } from '@modules/books/infra/typeorm/repositories/BooksRepository';
import { IAuthorRepository } from '@modules/authors/domain/repositories/IAuthorsRepository';
import { AuthorRepository } from '@modules/authors/infra/typeorm/repositories/AuthorsRepository';

container.registerSingleton<IBooksRepository>('BookRepository', BookRepository);

container.registerSingleton<IAuthorRepository>(
  'AuthorRepository',
  AuthorRepository,
);
