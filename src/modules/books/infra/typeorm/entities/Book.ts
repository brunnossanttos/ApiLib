import { Comment } from '@modules/comments/infra/typeorm/entities/Comment';
import { Like } from '@modules/likes/infra/typeorm/entities/Like';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('books')
class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;

  @OneToMany(() => Like, like => like.book)
  likes: Like[];

  @OneToMany(() => Comment, comment => comment.book)
  comments: Comment[];
}

export { Book };
