import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDocument } from './user';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@InjectModel('users') private  readonly _userModel: Model<UserDocument>){}

    save(user: CreateUserDto): Promise<UserDocument> {
        return new this._userModel(user).save()
    }

    finByEmail(email: string) {
        return this._userModel.findOne({ email })
    }

    finById(_id: string) {
        return this._userModel.findById(_id)
    }

    createHash(password: string): Promise<string> {
        return bcrypt.hash(password, 10)
    }
}
