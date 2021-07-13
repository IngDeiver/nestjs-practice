import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto.';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskDocument } from './task';

@Injectable()
export class TaskService {
    constructor(@InjectModel('tasks') private readonly _taskModel: Model<TaskDocument>){}

    create(task: CreateTaskDto): Promise<TaskDocument>{
        return new this._taskModel(task).save()
    }

    update(task: UpdateTaskDto) {
        return this._taskModel.findByIdAndUpdate( {_id: task._id }, task, { new: true })
    }
}
