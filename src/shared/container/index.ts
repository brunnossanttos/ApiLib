import { container } from 'tsyringe';

import { IBooksRepository } from '@modules/books/domain/repositories/IBooksRepository';
import { BookRepository } from '@modules/books/infra/typeorm/repositories/BooksRepositories';

container.registerSingleton<IBooksRepository>('BookRepository', BookRepository);
