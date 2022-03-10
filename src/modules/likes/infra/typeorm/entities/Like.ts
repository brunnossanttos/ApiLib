import { Book } from '@modules/books/infra/typeorm/entities/Book';
import { ILike } from '@modules/likes/domain/models/ILike';
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
import { Exclude } from 'class-transformer';
import { v4 as uuid } from 'uuid';

@Entity('user_like')
class Like implements ILike {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  is_like: boolean;

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;

  @Column()
  book_id: string;
  @ManyToOne(() => Book, book => book.likes)
  @JoinColumn({ name: 'book_id' })
  book: Book;

  @Column()
  user_id: string;
  @ManyToOne(() => User, user => user.likes)
  @JoinColumn({ name: 'user_id' })
  user: User;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Like };
