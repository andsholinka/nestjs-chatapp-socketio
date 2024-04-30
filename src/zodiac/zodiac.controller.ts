import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateZodiacDto } from './dto/zodiac.dto';
import { ZodiacService } from './zodiac.service';

@Controller('api')
export class ZodiacController {

    constructor(private zodiacService: ZodiacService) { }

    @Post('zodiac')
    createZodiac(@Body() createZodiacDto: CreateZodiacDto) {
        return this.zodiacService.createZodiac(createZodiacDto);
    }

    @Get('zodiac')
    getZodiac(): Promise<CreateZodiacDto[]> {
        return this.zodiacService.getZodiac();
    }
}
