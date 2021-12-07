import { Injectable } from "@nestjs/common";
import { MessageRepository } from '../repositories/message.repository'

@Injectable()
export class MessagesService {

  constructor(private repo: MessageRepository) { }

  findOne(id: string) {
    return this.repo.findOne(id);
  }

  findAll() {
    return this.repo.findAll()
  }

  create(content: string) {
    this.repo.create(content);
  }


}