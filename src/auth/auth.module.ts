import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { RoleGuard } from './guards/role.guard';

import { AuthService } from './services/auth.service';

import { AuthController } from './auth.controller';

import { JwtStrategy } from './strategies/jwt.strategy';

import { UserRepository } from './repositories/user.repository';

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
  providers: [AuthService, JwtStrategy, RoleGuard],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule, AuthService, RoleGuard],
})
export class AuthModule {}
