import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { HoroscopeController } from './horoscope.controller';
import { HoroscopeService } from './horoscope.service';
import { Horoscope, HoroscopeSchema } from './schemas/horoscope.schema';
import { Zodiac, ZodiacSchema } from 'src/zodiac/schemas/zodiac.schema';
import { ZodiacService } from 'src/zodiac/zodiac.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Horoscope.name, schema: HoroscopeSchema },
      { name: Zodiac.name, schema: ZodiacSchema }
    ]),
  ],
  controllers: [HoroscopeController],
  providers: [HoroscopeService, ZodiacService],
})
export class HoroscopeModule { }
