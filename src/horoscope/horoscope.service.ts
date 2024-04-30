import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { Horoscope } from './schemas/horoscope.schema';
import { CreateHoroscopeDto } from './dto/horoscope.dto';

@Injectable()
export class HoroscopeService {
    constructor(@InjectModel(Horoscope.name) private horoscopeModel: Model<Horoscope>) { }

    createHoroscopre(createHoroscopeDto: CreateHoroscopeDto) {
        const createdHoroscope = new this.horoscopeModel(createHoroscopeDto);
        return createdHoroscope.save()
    }

    async getHoroscope(): Promise<Horoscope[]> {
        const horoscopes = await this.horoscopeModel.find();
        return horoscopes
    }
}
