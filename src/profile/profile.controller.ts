import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfileService } from './profile.service';
import { AuthGuard } from '@nestjs/passport';
import { UpdateProfileDto } from './dto/update-profile.dto';
import mongoose from 'mongoose';

@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService) { }

    @UseGuards(AuthGuard())
    @Post()
    @UsePipes(new ValidationPipe())
    async createUser(@Body() data: CreateProfileDto, @Req() req) {
        const duplicateUserId = await this.profileService.getProfileByUserId(req.user._id);

        if (duplicateUserId) throw new HttpException('Profile already exist', HttpStatus.BAD_REQUEST);

        return this.profileService.createProfile(data, req.user);
    }

    @UseGuards(AuthGuard())
    @Get()
    async getProfile(@Req() req) {
        const user = await this.profileService.getProfileByUserId(req.user._id);

        if (!user) throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);

        return user;
    }

    @UseGuards(AuthGuard())
    @Put(':id')
    @UsePipes(new ValidationPipe())
    async updateProfile(@Param('id') id: string, @Body() data: UpdateProfileDto) {
        const updateProfile = await this.profileService.updateProfile(id, data);

        if (!updateProfile) throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);

        return updateProfile;
    }

    @UseGuards(AuthGuard())
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteProfile(@Param('id') id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException('Invalid user id', 400);

        const deletedUser = await this.profileService.deleteProfile(id);
        if (!deletedUser) throw new HttpException('User not found', 404);
    }

}
