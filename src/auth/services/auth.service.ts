import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { UserRepository } from '../repositories/user.repository';

import { User } from '../entities/user.entity';

import { AuthCredentialsDto } from '../dtos/auth-credentials.dto';
import { UsersFilterDto } from '../../users/dtos/users-filter.dto';
import { UpdateUserDto } from '../../users/dtos/update-user.dto';

import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { SignUpDto } from '../dtos/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  signUp(signUpDto: SignUpDto): Promise<void> {
    return this.userRepository.signUp(signUpDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validateUserPassword(
      authCredentialsDto,
    );

    if (!username) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { username };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async findOne(id: number): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail(id, {
        relations: ['projectsOwned', 'projectsAssigned'],
      });
    } catch (error) {
      throw new NotFoundException(`User with id: '${id}' not found!`);
    }
  }

  findAll(usersFilterDto: UsersFilterDto): Promise<User[]> {
    return this.userRepository.filterUsers(usersFilterDto);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    const user = await this.findOne(id);

    const { approved } = updateUserDto;

    user.approved = approved ?? user?.approved;

    await user.save();
  }
}
