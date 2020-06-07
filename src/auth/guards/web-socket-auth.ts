import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { JwtService } from '@nestjs/jwt';

export class WebSocketAuth {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(
    context: any,
  ): boolean | any | Promise<boolean | any> | Observable<boolean | any> {
    const bearerToken = context.args[0].handshake.headers.authorization.split(
      ' ',
    )[1];
    try {
      const decoded = this.jwtService.verify(bearerToken) as any;
      return new Promise((resolve, reject) => {
        return this.authService.findOne(decoded.id).then(user => {
          if (user) {
            resolve(user);
          } else {
            reject(false);
          }
        });
      });
    } catch (ex) {
      console.log(ex);
      return false;
    }
  }
}
