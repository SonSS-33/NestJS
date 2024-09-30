import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from 'src/user/user.service';
import { SignInModel } from './models/sign-in.model';
import { UserEntity } from 'src/user/entities/user.entity';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<UserEntity> {
    const user = await this.userService.findOne(username);
    if (user && (await compare(password, user.password))) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async signIn(username: string, password: string): Promise<SignInModel> {
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { userId: user.id, username: user.username };
    const accessToken = await this.jwtService.signAsync(payload);
    return new SignInModel(accessToken);
  }
}
