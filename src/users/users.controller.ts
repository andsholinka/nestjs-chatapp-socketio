import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Param, Patch, Post, Put, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import mongoose from "mongoose";
import { User } from "src/users/schemas/user.schema";
import { AuthGuard } from "@nestjs/passport";

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Post()
    @UsePipes(new ValidationPipe())
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @UseGuards(AuthGuard())
    @Get()
    async getUsers(): Promise<User[]> {
        return this.usersService.getUsers();
    }

    @UseGuards(AuthGuard())
    @Get(':id')
    async getUser(@Param('id') id: string) {
        const isValid = mongoose.isValidObjectId(id);
        if (!isValid) throw new BadRequestException('Please provide valid user id');

        const findUser = await this.usersService.getUserById(id);
        if (!findUser) throw new NotFoundException('User not found');

        return findUser;
    }

    @UseGuards(AuthGuard())
    @Put(':id')
    @UsePipes(new ValidationPipe())
    async updateUser(@Param('id') id: string, @Body() data: CreateUserDto) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException('Invalid user id', 400);

        const updatedUser = await this.usersService.updateUser(id, data);
        if (!updatedUser) throw new HttpException('User not found', 404);

        return updatedUser;
    }

    @UseGuards(AuthGuard())
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteUser(@Param('id') id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException('Invalid user id', 400);

        const deletedUser = await this.usersService.deleteUser(id);
        if (!deletedUser) throw new HttpException('User not found', 404);
    }
}