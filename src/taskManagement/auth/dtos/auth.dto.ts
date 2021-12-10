import { IsString, MaxLength, MinLength } from "class-validator";


export class AuthCredentialsDto {
  @IsString()
  username: string;

  @IsString()
  @MinLength(3)
  @MaxLength(100)
  password: string;

}