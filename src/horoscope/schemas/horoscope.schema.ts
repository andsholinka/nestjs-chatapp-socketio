import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Horoscope {
    @Prop({ required: true })
    startDate: string;

    @Prop({ required: true })
    endDate: string;

    @Prop({ required: true })
    horoscope: string;
}

export const HoroscopeSchema = SchemaFactory.createForClass(Horoscope);
