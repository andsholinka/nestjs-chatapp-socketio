import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from './schemas/profile.schema';
import { Model } from 'mongoose';
import { CreateProfileDto } from './dto/create-profile.dto';
import { User } from 'src/auth/schemas/user.schema';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
    constructor(@InjectModel(Profile.name) private profileModel: Model<Profile>) { }

    async createProfile(createProfile: CreateProfileDto, user: User) {
        const data = Object.assign(createProfile, { userId: user._id });
        const newProfile = new this.profileModel(data);
        return await newProfile.save();
    }

    async getProfileByUserId(userId: string) {
        return await this.profileModel.findOne({ userId });
    }

    async updateProfile(id: string, updateProfile: UpdateProfileDto) {
        const filter = { userId: id };
        return await this.profileModel.findOneAndUpdate(filter, updateProfile || {}, { new: true });
    }

    async deleteProfile(id: string) {
        return await this.profileModel.findByIdAndDelete(id);
    }
}
