import { IUser } from 'src/common/interfaces/user.interface';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity('users')
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn()
  id: number;


  @Column({ unique: true })
  username: string;


  @Column({ unique: true })
  email: string;


  @Column({ select: true })
  password: string;

}