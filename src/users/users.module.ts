import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/users/schemas/user.schema";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [
        AuthModule,
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema
            }
        ]),
    ],
    providers: [
        UsersService
    ],
    controllers: [
        UsersController
    ],
})
export class UsersModule { }