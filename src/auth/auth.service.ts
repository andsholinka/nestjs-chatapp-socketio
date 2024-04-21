import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService
    ) { }

    async signUp(signUpDto: SignupDto): Promise<{ token: string }> {
        const { username, email, password } = signUpDto;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.userModel.create({
            username,
            email,
            password: hashedPassword
        })

        const token = await this.jwtService.signAsync({ id: user._id });

        return { token };
    }

    async login(loginDto: LoginDto): Promise<{ token: string }> {
        const { email, password } = loginDto;

        const user = await this.userModel.findOne({ email });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const token = await this.jwtService.signAsync({ id: user._id });

        return { token };
    }
}
