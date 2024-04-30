import { Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Conversation, ConversationSchema } from './schemas/conversation.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      {
        name: Conversation.name,
        schema: ConversationSchema
      }
    ]),
  ],
  providers: [ConversationService],
  controllers: [ConversationController]
})
export class ConversationModule { }
