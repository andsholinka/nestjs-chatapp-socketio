import { Module } from '@nestjs/common';
import { ZodiacController } from './zodiac.controller';
import { ZodiacService } from './zodiac.service';
import { Zodiac, ZodiacSchema } from './schemas/zodiac.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: Zodiac.name, schema: ZodiacSchema }])
  ],
  controllers: [ZodiacController],
  providers: [ZodiacService]
})
export class ZodiacModule { }
