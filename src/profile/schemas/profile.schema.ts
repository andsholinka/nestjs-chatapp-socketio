import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HoroscopeSchema } from "../../horoscope/schemas/horoscope.schema";
import mongoose from "mongoose";
import { User } from "src/auth/schemas/user.schema";

export enum Gender {
    Male = 'Male',
    Female = 'Female',
}

@Schema({ timestamps: true })
export class Profile {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', })
    userId: User;

    @Prop()
    displayName: string;

    @Prop()
    gender: Gender;

    @Prop()
    birthday: Date;

    @Prop({ type: HoroscopeSchema })
    horoscope?: string;

    @Prop()
    height: number;

    @Prop()
    weight: number;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);