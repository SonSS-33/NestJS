import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import database from 'src/config/database';
import { RolesGuard } from 'src/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/middlewares/jwt.auth.guard';
import { PostModule } from 'src/post/post.module';
import { CommentModule } from 'src/comment/comment.module';
import { LikeModule } from 'src/like/like.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [database],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get('database') as TypeOrmModuleOptions;
      },
    }),
    UserModule,
    AuthModule,
    PostModule,
    CommentModule,
    LikeModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
