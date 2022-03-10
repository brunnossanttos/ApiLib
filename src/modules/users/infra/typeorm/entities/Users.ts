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

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Like, like => like.book)
  likes: Like[];

  @OneToMany(() => Comment, comment => comment.user_id)
  comments: Comment[];
}

export { User };
