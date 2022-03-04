import { ICreateUser } from '../models/ICreateUser';
import { IUserPaginate } from '../models/IPaginate';
import { IUser } from '../models/IUser';

export interface IUsersRepository {
  findByName(name: string): Promise<IUser | undefined>;
  findById(id: string): Promise<IUser | undefined>;
  findAll(): Promise<IUser[]>;
  findAllPaginate(): Promise<IUserPaginate>;
  findByEmail(email: string): Promise<IUser | undefined>;
  remove(user: IUser): Promise<void>;
  create(data: ICreateUser): Promise<IUser>;
  save(user: IUser): Promise<IUser>;
}
