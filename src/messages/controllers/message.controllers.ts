import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { MessagesService } from "../services/message.service";

export interface Repository {
  findAll();
  findOne(id: string);
  create(content: string);

}

@Controller('/messages')
export class MessageController {

  constructor(
    private service: MessagesService
  ) { }

  @Get()
  listMessages() {
    return this.service.findAll();
  }

  @Post()
  createMessge(@Body() body: { content: string }) {
    console.log(body);
    return this.service.create(body.content);
  }

  @Get('/:id')
  getMessage(@Param('id') id: string) {

    return this.service.findOne(id);
  }



}