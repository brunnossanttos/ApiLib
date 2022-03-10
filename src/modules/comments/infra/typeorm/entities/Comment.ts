import { IComment } from '@modules/comments/domain/models/IComment';
import { Book } from '@modules/books/infra/typeorm/entities/Book';
import { User } from '@modules/users/infra/typeorm/entities/Users';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('books_user_comments')
class Comment implements IComment {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  comment: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  book_id: string;
  @ManyToOne(() => Book, book => book.comments)
  @JoinColumn({ name: 'book_id' })
  book: Book;

  @Column()
  user_id: string;
  @ManyToOne('users', (user: User) => user.comments)
  @JoinColumn({ name: 'user_id' })
  user: User;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Comment };
