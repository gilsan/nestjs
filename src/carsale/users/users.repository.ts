import { Injectable } from "@nestjs/common";


@Injectable()
export class UsersRepository {

  createUser() { }
  saveUser() { }
  findAllUsers() { }

  findOneUser(id: number) { }

  removeUser(id: number) { }


}