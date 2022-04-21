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

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;

  @OneToMany(() => Like, like => like.book)
  likes: Like[];

  @OneToMany(() => Comment, comment => comment.user_id)
  comments: Comment[];
}

export { User };
