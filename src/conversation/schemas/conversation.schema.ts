import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
    timestamps: true
})
export class Conversation {
    @Prop({ type: [], default: [] })
    participants: [];

    // Ubah properti messages untuk merujuk ke ObjectId dari model Message
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }], default: [] })
    messages: mongoose.Types.ObjectId[]; // Sesuaikan dengan tipe ObjectId jika diperlukan
}
export const ConversationSchema = SchemaFactory.createForClass(Conversation);
