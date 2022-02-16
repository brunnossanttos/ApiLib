import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IBook } from '@modules/books/domain/models/IBook';

@Entity('books')
class Book implements IBook {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column('int')
  pages: number;

  @Column()
  status: boolean;

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}

export default Book;
