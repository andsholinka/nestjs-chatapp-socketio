import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Conversation } from './schemas/conversation.schema';

@Injectable()
export class ConversationService {

    constructor(@InjectModel(Conversation.name) private readonly conversationModel) { }

    async createConversation(conversation: any) {
        return await this.conversationModel.create(conversation);
    }

    async getConversations(filter: { participants: { $all: any[]; }; }) {
        const conversation = await this.conversationModel.findOne(filter).populate('messages');

        return conversation;
    }
}
