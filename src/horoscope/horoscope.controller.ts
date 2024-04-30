import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateHoroscopeDto } from './dto/horoscope.dto';
import { HoroscopeService } from './horoscope.service';
import { Horoscope } from './schemas/horoscope.schema';
import { AuthGuard } from '@nestjs/passport';
import { ZodiacService } from 'src/zodiac/zodiac.service';
import GeneralHelper from 'src/helpers/generalHelper';

export class BirthdayDto {
    birthday: string;
}

@Controller('api')
export class HoroscopeController {

    constructor(
        private horoscopeService: HoroscopeService,
        private zodiacService: ZodiacService
    ) { }

    @Post('horoscope')
    @UsePipes(new ValidationPipe())
    createHoroscope(@Body() createHoroscopeDto: CreateHoroscopeDto) {
        return this.horoscopeService.createHoroscopre(createHoroscopeDto)
    }

    @Get('horoscope')
    async getHoroscope(): Promise<Horoscope[]> {
        return this.horoscopeService.getHoroscope();
    }

    @Post('horoscope-zodiac')
    @HttpCode(HttpStatus.OK)
    async getHoroscopeAndZodiac(@Body() data: BirthdayDto) {
        const birthDate = data.birthday;
        const horoscopes = await this.horoscopeService.getHoroscope();
        const zodiacs = await this.zodiacService.getZodiac();

        const myHoroscope = GeneralHelper.findHoroscope(horoscopes, birthDate);
        const myZodiac = GeneralHelper.findZodiac(zodiacs, birthDate);

        return {
            birthday: birthDate,
            horoscope: myHoroscope.horoscope,
            zodiac: myZodiac.name
        }
    }
}
