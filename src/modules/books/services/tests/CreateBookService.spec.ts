import 'reflect-metadata';
import CreateBookService from '../CreateBookService';
import FakeBookRepository from '@modules/books/domain/repositories/fakes/FakeBooksRepository';
import AppError from '@shared/errors/AppError';

describe('CreateBook', () => {
  it('should be able to create a new book', async () => {
    const fakeBookRepository = new FakeBookRepository();

    const createBook = new CreateBookService(fakeBookRepository);

    const book = await createBook.execute({
      title: 'MidHunter',
      author: 'Thais',
    });

    expect(book).toHaveProperty('id');
  });

  it('shoul not be able to create two books with same title', async () => {
    const fakeBookRepository = new FakeBookRepository();
    const createBook = new CreateBookService(fakeBookRepository);

    await createBook.execute({
      title: 'MidHunter',
      author: 'Thais',
    });

    expect(
      createBook.execute({
        title: 'MidHunter',
        author: 'Thais',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
