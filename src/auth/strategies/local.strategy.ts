import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserDocument } from 'src/users/user';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<UserDocument> {
    const userFound: UserDocument = await this._authService.validateUser(email);
    if (!userFound) {
      throw new UnauthorizedException();
    }
    
    const isValidPassword: boolean = await this._authService.comparePassword(password, userFound.password)
    if(!isValidPassword){
      throw new UnauthorizedException();
    }
    return userFound;
  }
}