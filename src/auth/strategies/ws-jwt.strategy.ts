import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserRepository } from '../user.repository';

import { User } from '../user.entity';

import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { WsException } from '@nestjs/websockets';

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
      throw new WsException('Unauthorized access');
    }
  }
}
