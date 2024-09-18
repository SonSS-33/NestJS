import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/service/users.service';
import { SignInModel } from './models/sign-in.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string) {
    const user = await this.usersService.getUserByUsername(username);

    if (user.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { userId: user.id, username: user.username };
    const accessToken = await this.jwtService.signAsync(payload);

    return new SignInModel(accessToken);
  }
}
