import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/users/schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    createUser(createUserDto: CreateUserDto) {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async getUsers(): Promise<User[]> {
        const users = await this.userModel.find();
        return users;
    }

    async getUserById(id: string) {
        const user = await this.userModel.findById(id);
        return user;
    }

    updateUser(id: string, data: CreateUserDto) {
        return this.userModel.findByIdAndUpdate(id, data);
    }

    deleteUser(id: string) {
        return this.userModel.findByIdAndDelete(id);
    }
}