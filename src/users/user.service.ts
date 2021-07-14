import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDocument, USER_SCHEMA } from './user';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel(USER_SCHEMA) private  readonly _userModel: Model<UserDocument>){}

    save(user: CreateUserDto): Promise<UserDocument> {
        return new this._userModel(user).save()
    }

    finByEmail(email: string) {
        return this._userModel.findOne({ email }).select('+password')
    }

    finById(_id: string) {
        return this._userModel.findById(_id)
    }

    createHash(password: string): Promise<string> {
        return bcrypt.hash(password, 10)
    }
}
