import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { HoroscopeModule } from './horoscope/horoscope.module';
import { ProfileModule } from './profile/profile.module';
import { ZodiacModule } from './zodiac/zodiac.module';
import { MessageModule } from './message/message.module';
import { ConversationModule } from './conversation/conversation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UsersModule,
    AuthModule,
    HoroscopeModule,
    ProfileModule,
    ZodiacModule,
    MessageModule,
    ConversationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
