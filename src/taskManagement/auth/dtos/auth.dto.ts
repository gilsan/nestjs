import { IsString, MaxLength, MinLength } from "class-validator";
import { Expose, Exclude } from 'class-transformer';

export class AuthCredentialsDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(3)
  @MaxLength(100)
  password: string;

}

export class UserDto {

  @Expose()
  id: number;

  @Expose()
  username: string;

  password: string;


}