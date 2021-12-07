import { Module } from "@nestjs/common";
import { MessageController } from "./controllers/message.controllers";
import { MessageRepository } from "./repositories/message.repository";
import { MessagesService } from "./services/message.service";

@Module({
  controllers: [
    MessageController
  ],
  imports: [],
  providers: [
    MessagesService,
    MessageRepository
  ]
})
export class MessagesModule {

}