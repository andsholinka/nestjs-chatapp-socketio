import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Horoscope {
    @Prop({ required: true })
    start: string;

    @Prop({ required: true })
    end: string;

    @Prop({ required: true })
    Horoscope: string;
}

export const HoroscopeSchema = SchemaFactory.createForClass(Horoscope);
