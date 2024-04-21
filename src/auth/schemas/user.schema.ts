import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
    timestamps: true
})
export class User extends Document {
    @Prop({ unique: [true, 'Username already exists'] })
    username: string;

    @Prop({ unique: [true, 'Email already exists'] })
    email: string;

    @Prop({ required: true })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

