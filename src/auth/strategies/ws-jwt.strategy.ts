import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserRepository } from '../repositories/user.repository';

import { User } from '../entities/user.entity';

import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class WsJwtStrategy extends PassportStrategy(Strategy, 'wsjwt') {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('bearerToken'),
      secretOrKey: 'topSecret21',
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    try {
      return this.userRepository.findOneOrFail({ username });
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
