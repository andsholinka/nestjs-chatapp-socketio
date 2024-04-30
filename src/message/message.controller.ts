import { BadRequestException, Body, Controller, Get, Param, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { MessageService } from './message.service';
import { AuthGuard } from '@nestjs/passport';
import { ConversationService } from 'src/conversation/conversation.service';
import mongoose from 'mongoose';

@Controller('message')
export class MessageController {

    constructor(
        private messageService: MessageService,
        private conversationService: ConversationService
    ) { }

    @Post('create/:id')
    @UsePipes(new ValidationPipe())
    @UseGuards(AuthGuard())
    async createMessage(@Req() req, @Param('id') id: string, @Body() message: any) {
        const senderId = req.user.id;
        const receiverId = id;

        let conversation = await this.conversationService.getConversations({
            participants: {
                $all: [senderId, receiverId]
            }
        });

        if (!conversation) {
            conversation = await this.conversationService.createConversation({
                participants: [senderId, receiverId],
            })
        }

        const newMessage = await this.messageService.createMessage({
            senderId,
            receiverId,
            message: message.message
        })

        if (newMessage) {
            conversation.messages.push(newMessage.id)
        }

        await Promise.all([conversation.save(), newMessage.save()])

        return newMessage
    }

    @Get('get/:id')
    @UseGuards(AuthGuard())
    async getMessages(@Req() req, @Param('id') id: string) {
        const senderId = req.user.id;
        const userToChatId = id;

        const isValid = mongoose.isValidObjectId(id);
        if (!isValid) throw new BadRequestException('Please provide valid user id');

        const conversation = await this.conversationService.getConversations({
            participants: {
                $all: [senderId, userToChatId]
            }
        })

        if (!conversation) {
            return []
        }
        const messages = conversation.messages;

        return messages;
    }
}
