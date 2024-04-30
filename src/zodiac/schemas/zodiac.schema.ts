import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Zodiac {
    @Prop({ required: true })
    name: string;

    @Prop({ type: [Number], default: [] })
    years: number[];
}

export const ZodiacSchema = SchemaFactory.createForClass(Zodiac);
