import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { UserDocument } from 'src/users/user';

export type TaskDocument = Task & Document;

@Schema()
export class Task {
    @Prop()
    title: string

    @Prop()
    description: string

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    owner: UserDocument
}

export const TaskSchema = SchemaFactory.createForClass(Task)

export type CaslFlatTask = Task & {
    'owner._id': Task['owner']['_id']
};