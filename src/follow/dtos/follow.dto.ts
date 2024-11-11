import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateFollowDto {
  @IsNumber()
  @IsNotEmpty()
  followedUserId: number;
}

export class DeleteFollowDto {
  @IsNumber()
  @IsNotEmpty()
  followedUserId: number;
}
