import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";
import { JwtPayload } from "./models/jwt-payload.interface";
import { User } from "./user.entity";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    @InjectRepository(User) private repo: Repository<User>
  ) {
    super({
      secretOrKey: 'topSecrete51',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    })
  }


  async validate(payload: JwtPayload) {
    const { username } = payload;
    const user = await this.repo.findOne({ username });
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}