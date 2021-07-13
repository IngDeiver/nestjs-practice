import { Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Action } from 'src/permisions/casl/Actions';
import { AppAbility } from 'src/permisions/casl/casl-ability.factory';
import { CheckPolicies } from 'src/permisions/policies-check.decorator';
import { PoliciesGuard } from 'src/permisions/policies.guard';
import { CreateTaskDto } from './dto/create-task.dto.';
import { InputTaskDto } from './dto/input-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {

    constructor(private readonly _taskService: TaskService){}

    @Post()
    create(@Body() task: InputTaskDto, @Req() req){
        console.log("body->", task);
        
        console.log("id->", req.user._id);
        const taskWithOwner: CreateTaskDto = plainToClass(CreateTaskDto, { ...task, owner: req.user._id })
        console.log("taskWithOwner-> ", taskWithOwner);
        
        return this._taskService.create(taskWithOwner)
    }

    @UseGuards(PoliciesGuard)
    @CheckPolicies((ability: AppAbility, subject: Task) => ability.can(Action.Update, subject))
    @Put()
    update(@Body() task: UpdateTaskDto){
        console.log("task -> ", task);
        return this._taskService.update(task)
    }
}
