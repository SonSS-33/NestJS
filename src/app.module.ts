import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';
import { AuthModule } from './authentication/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'songlong',
      database: 'intern',
      entities: [User],
      synchronize: true,
    }),
    PostModule,
    UsersModule, 
   AuthModule
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule {}
