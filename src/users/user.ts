import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose'

export type UserDocument = User & Document;
export const USER_SCHEMA = 'User'

@Schema()
export class User {

    @Prop({ type: mongoose.Types.ObjectId })
    _id: mongoose.Types.ObjectId

    @Prop({ unique: true})
    email: string
    
    @Prop()
    username: string

    @Prop({ select: false })
    password: string
}

export const UserSchema = SchemaFactory.createForClass(User)
