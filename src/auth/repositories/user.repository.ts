import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';

import { AuthCredentialsDto } from '../dtos/auth-credentials.dto';
import { UsersFilterDto } from '../../users/dtos/users-filter.dto';
import { SignUpDto } from '../dtos/sign-up.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(signUpDto: SignUpDto): Promise<void> {
    const { username, password, role } = signUpDto;

    const salt = await bcrypt.genSalt();

    const user = new User();
    user.username = username;
    user.salt = salt;
    user.password = await UserRepository.hashPassword(password, salt);
    user.role = role;

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<string> {
    const { username, password } = authCredentialsDto;

    const user = await this.findOne({ username });

    if (user && (await user.validatePassword(password))) {
      return user.username;
    }

    return null;
  }

  filterUsers(usersFilterDto: UsersFilterDto): Promise<User[]> {
    const { search } = usersFilterDto;

    const query = this.createQueryBuilder('user');

    if (search) {
      query.andWhere(
        'user.username LIKE :search OR user.username LIKE :search',
        {
          search: `%${search}%`,
        },
      );
    }

    return query.getMany();
  }

  private static hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
