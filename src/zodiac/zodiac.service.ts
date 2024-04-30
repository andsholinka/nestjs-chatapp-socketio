import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Zodiac } from './schemas/zodiac.schema';
import { Model } from 'mongoose';
import { CreateZodiacDto } from './dto/zodiac.dto';

@Injectable()
export class ZodiacService {
    constructor(@InjectModel(Zodiac.name) private zodiacModel: Model<Zodiac>) { }

    async createZodiac(createZodiacDto: CreateZodiacDto) {
        const createdZodiac = new this.zodiacModel(createZodiacDto);
        return await createdZodiac.save();
    }

    async getZodiac(): Promise<Zodiac[]> {
        const zodiacs = await this.zodiacModel.find();
        return zodiacs;
    }
}
