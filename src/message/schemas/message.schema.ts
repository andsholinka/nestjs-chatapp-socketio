import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: true
})
export class Message {
    @Prop()
    senderId: string;

    @Prop()
    receiverId: string;

    @Prop()
    message: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);

