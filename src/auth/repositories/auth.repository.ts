import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IUSER } from "share/models";

// import * as jwt from 'jsonwebtoken';
// import * as password from 'password-hash-and-salt';
import { JWT_SECRETE } from "../../constants";

@Injectable()
export class AuthRepository {

  constructor(
    @InjectModel('User') private user: Model<IUSER>,
    private jwtService: JwtService
  ) { }

  async login(email: string, plainedpassword: string): Promise<{ accessToken: string }> {
    console.log('[18][]', email, plainedpassword);
    const payload: { email: string } = { email }

    const accessToken: string = await this.jwtService.sign(payload);
    return { accessToken }


  }
}