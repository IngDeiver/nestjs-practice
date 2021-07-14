import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto.';
import { Task, TaskDocument, TASK_SCHEMA } from './task';

@Injectable()
export class TaskService {
    constructor(@InjectModel(TASK_SCHEMA) private readonly _taskModel: Model<TaskDocument>){}

    create(task: CreateTaskDto): Promise<TaskDocument>{
        return new this._taskModel(task).save()
    }

    update(body: Task, _id: string): Promise<TaskDocument> {
        return this._taskModel.findByIdAndUpdate( {_id}, body, { new: true })
        .exec()
    }

    async findAll(ownerId: string): Promise<TaskDocument[]> {
        const tasks: TaskDocument[] =  await this._taskModel.find({})
        .populate('owner').exec()
        return tasks.filter( task => task.owner._id.toString() === ownerId)
    }

    async findById(_id: string):Promise<TaskDocument> {
        return this._taskModel.findById(_id)
         .populate('owner')
         .exec()
    }
}
