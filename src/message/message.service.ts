import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './schemas/message.schema';

@Injectable()
export class MessageService {

    constructor(@InjectModel(Message.name) private readonly messageModel) { }

    async createMessage(message: any) {
        return await this.messageModel.create(message);
    }

    async getMessages() {
        return await this.messageModel.find();
    }
}
