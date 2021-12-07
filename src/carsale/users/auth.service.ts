import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UserService } from "./user.service";
import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class AuthService {

  constructor(
    private userService: UserService
  ) { }

  async signup(email: string, password: string) {
    const user = await this.userService.find(email);
    if (user.length > 0) {
      throw new BadRequestException('이미 사용중 입니다.')
    }
    // Hash the users password
    const salt = randomBytes(8).toString('hex')
    // Hash the salt and the password toggether
    const hash = (await promisify(scrypt)(password, salt, 32)) as Buffer;
    // Join the hashed result and the salt together
    const result = salt + '.' + hash.toString('hex');
    // Create a new user and save it
    const userCrypt = await this.userService.create(email, result)
    // return the user
    return userCrypt;

  }

  async signin(email: string, password: string) {
    const [user] = await this.userService.find(email);
    if (!user) {
      throw new NotFoundException('no found user')
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await promisify(scrypt)(password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('bad password')
    }
    return user;

  }

}