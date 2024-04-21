import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/schemas/User.schema";
import { CreateUserDto } from "./dto/CreateUser.dto";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

    createUser(createUserDto: CreateUserDto) {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    getUsers() {
        return this.userModel.find();
    }

    getUserById(id: string) {
        return this.userModel.findById(id);
    }

    updateUser(id: string, data: CreateUserDto) {
        return this.userModel.findByIdAndUpdate(id, data);
    }

    deleteUser(id: string) {
        return this.userModel.findByIdAndDelete(id);
    }
}