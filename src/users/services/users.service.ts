import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRepository } from '../../auth/repositories/user.repository';

import { User } from '../../auth/entities/user.entity';

import { UsersFilterDto } from '../dtos/users-filter.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UsersService {
  private readonly logger: Logger;

  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {
    this.logger = new Logger(UsersService.name);
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

    const {
      approved,
      fullName,
      dateOfBirth,
      careerDetails,
      email,
      telephone,
      role,
      profileImageUrl,
    } = updateUserDto;

    user.approved = approved ?? user.approved;
    user.fullName = fullName ?? user?.fullName;
    user.dateOfBirth = dateOfBirth ?? user?.dateOfBirth;
    user.careerDetails = careerDetails ?? user?.careerDetails;
    user.email = email ?? user?.email;
    user.telephone = telephone ?? user?.telephone;
    user.role = role ?? user?.role;
    user.profileImageUrl = profileImageUrl ?? user?.profileImageUrl;

    await user.save();
  }
}
