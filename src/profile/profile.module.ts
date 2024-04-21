import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Profile, ProfileSchema } from './schemas/profile.schema';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';

@Module({
    imports: [
        AuthModule,
        MongooseModule.forFeature([
            {
                name: Profile.name,
                schema: ProfileSchema
            }
        ])
    ],
    providers: [
        ProfileService
    ],
    controllers: [
        ProfileController
    ],
})
export class ProfileModule { }
