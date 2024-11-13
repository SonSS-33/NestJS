import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/user/user.service';
import { SignInModel } from './models/sign-in.model';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<boolean> {
    const user = await this.userService.getUserByUsername(username, false);
    const checkPassword = await compare(password, user.password);
    if (!checkPassword) {
      return false;
    }
    return true;
  }

  async signIn(username: string, password: string): Promise<SignInModel> {
    const checkValidUser = await this.validateUser(username, password);
    if (!checkValidUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const user = await this.userService.getUserByUsername(username, true);
    const payload = {
      userId: user.id,
      username: user.email,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload);
    return new SignInModel(accessToken);
  }
}
