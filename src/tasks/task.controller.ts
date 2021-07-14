import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Action } from 'src/permisions/casl/Actions';
import { AppAbility } from 'src/permisions/casl/casl-ability.factory';
import { CheckPolicies } from 'src/permisions/policies-check.decorator';
import { TasksPoliciesGuard } from 'src/tasks/guards/tasks-policies.guard';
import { CreateTaskDto } from './dto/create-task.dto.';
import { FindTaskDto } from './dto/find-task.dto';
import { InputTaskDto } from './dto/input-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {

    constructor(private readonly _taskService: TaskService){}

    @Post()
    create(@Body() task: InputTaskDto, @Req() req){
        const taskWithOwner: CreateTaskDto = plainToClass(CreateTaskDto, { ...task, owner: req.user._id })
        return this._taskService.create(taskWithOwner)
    }

    @UseGuards(TasksPoliciesGuard)
    @CheckPolicies((ability: AppAbility, subject: Task) => ability.can(Action.Update, subject))
    @Put()
    update(@Body() body: UpdateTaskDto){
        const task: Task = plainToClass(Task, body)
        return this._taskService.update(task, body._id)
    }

    @Get()
    findAll(@Req() req){
        return this._taskService.findAll(req.user._id)
    }

    @UseGuards(TasksPoliciesGuard)
    @CheckPolicies((ability: AppAbility, subject: Task) => ability.can(Action.Read, subject))
    @Get(':_id')
    findById(@Param() params : FindTaskDto){
        return this._taskService.findById(params._id)
    }
}
