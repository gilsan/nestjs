import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';

@Injectable()
export class MessageRepository {

  async findOne(id: string) {
    const contents = await readFile('../rest-api/src/messages/messages.json', 'utf8');
    const messages = JSON.parse(contents);
    return messages[id]
  }

  async findAll() {
    const contents = await readFile('../rest-api/src/messages/messages.json', 'utf8');
    return JSON.parse(contents);
  }

  async create(content: string) {
    const contents = await readFile('../rest-api/src/messages/messages.json', 'utf8');
    const messages = JSON.parse(contents);
    const id = Math.floor(Math.random() * 999);
    messages[id] = { id, content };
    console.log(messages);
    await writeFile('../rest-api/src/messages/messages.json', messages);

  }


}