import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { Message, MessageSchema } from './schemas/message.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Conversation, ConversationSchema } from 'src/conversation/schemas/conversation.schema';
import { ConversationService } from 'src/conversation/conversation.service';
import { ConversationController } from 'src/conversation/conversation.controller';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: Message.name,
        schema: MessageSchema
      },
      {
        name: Conversation.name,
        schema: ConversationSchema
      }
    ]),
  ],
  providers: [MessageService, ConversationService],
  controllers: [MessageController, ConversationController]
})
export class MessageModule { }
