import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AuthCredentialsDto } from "./dtos/auth.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./models/jwt-payload.interface";

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private jwtService: JwtService
  ) { }



  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.repo.create({ username, password: hashedPassword });

    try {
      await this.repo.save(user);
    } catch (err) {
      if (err.errno === 1062) {
        throw new ConflictException('이미 존재 합니다.');
      } else {
        throw new InternalServerErrorException();
      }
    }

  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialsDto;
    const user = await this.repo.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return accessToken;
    } else {
      throw new UnauthorizedException();
    }
  }

}