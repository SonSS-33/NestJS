import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants/auth.constants';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    
    JwtModule.register({
      
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30d' },
    }),
    UsersModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
 exports:[JwtModule,AuthService]
})
export class AuthModule {}
