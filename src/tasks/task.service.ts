import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto.';
import { Task, TaskDocument, TASK_SCHEMA } from './task';
import * as mongoose from 'mongoose'


@Injectable()
export class TaskService {
    constructor(@InjectModel(TASK_SCHEMA) private readonly _taskModel: Model<TaskDocument>){}

    create(task: CreateTaskDto): Promise<TaskDocument>{
        return new this._taskModel(task).save()
    }

    update(body: Task, _id: mongoose.Types.ObjectId): Promise<TaskDocument> {
        return this._taskModel.findByIdAndUpdate( {_id}, body, { new: true })
        .exec()
    }

    async findAll(ownerId: mongoose.Types.ObjectId): Promise<TaskDocument[]> {
        const query: any = { owner: ownerId }
        return   await this._taskModel.find(query)
        .populate('owner').exec()
        //return tasks.filter( task => task.owner._id.toString() === ownerId)
    }

    async findById(_id: mongoose.Types.ObjectId):Promise<TaskDocument> {
        return this._taskModel.findById(_id)
         .populate('owner')
         .exec()
    }
}
