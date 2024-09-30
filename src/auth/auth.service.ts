import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from 'src/user/user.service';
import { SignInModel } from './models/sign-in.model';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async comparePassword(
    //TO DO
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async signIn(username: string, password: string): Promise<SignInModel> {
    const user = await this.userService.getUserByUsername(username);
    //TO DO
    if (!user || !(await this.comparePassword(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = {
      userId: user.id,
      username: user.username,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload);
    return new SignInModel(accessToken); //TO DO
  }
}
