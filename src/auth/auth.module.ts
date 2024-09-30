import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import auth from './config/auth';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './passport/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [auth],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get('auth.jwt');
      },
    }),
    forwardRef(() => UserModule),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
