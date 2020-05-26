import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

const fs = require('fs');

import { UserRepository } from '../repositories/user.repository';

import { User } from '../entities/user.entity';

import { AuthCredentialsDto } from '../dtos/auth-credentials.dto';
import { UsersFilterDto } from '../../users/dtos/users-filter.dto';
import { UpdateUserDto } from '../../users/dtos/update-user.dto';
import { SignUpDto } from '../dtos/sign-up.dto';

import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  private readonly logger: Logger;

  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {
    this.logger = new Logger(AuthService.name);
  }

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

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    file?: any,
  ): Promise<void> {
    const user = await this.findOne(id);

    if (user.profileImageUrl && file) {
      this.removeFile(user.profileImageUrl);
    }

    const {
      approved,
      fullName,
      dateOfBirth,
      careerDetails,
      email,
      telephone,
    } = updateUserDto;

    user.approved = approved ?? user.approved;
    user.fullName = fullName ?? user?.fullName;
    user.dateOfBirth = dateOfBirth ?? user?.dateOfBirth;
    user.careerDetails = careerDetails ?? user?.careerDetails;
    user.email = email ?? user?.email;
    user.telephone = telephone ?? user?.telephone;
    user.profileImageUrl = file?.path ?? user?.profileImageUrl;

    await user.save();
  }

  private removeFile(filePath: string): void {
    try {
      fs.unlinkSync(`./${filePath}`);
    } catch (err) {
      this.logger.error({ err });

      throw new InternalServerErrorException('Unable to update user profile imaage');
    }
  }
}
