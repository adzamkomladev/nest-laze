import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { RoleGuard } from './guards/role.guard';
import { WsAuthGuard } from './guards/ws-auth.guard';

import { AuthService } from './auth.service';

import { AuthController } from './auth.controller';

import { JwtStrategy } from './strategies/jwt.strategy';
import { WsJwtStrategy } from './strategies/ws-jwt.strategy';

import { UserRepository } from './user.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret21',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [AuthService, JwtStrategy, WsJwtStrategy, RoleGuard, WsAuthGuard],
  controllers: [AuthController],
  exports: [PassportModule, AuthService, RoleGuard, TypeOrmModule, WsAuthGuard],
})
export class AuthModule {}
