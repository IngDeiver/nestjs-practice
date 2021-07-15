import { 
    Body, Controller, Get, Param, Post,
    Put, Req, UseGuards 
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Action } from 'src/permisions/casl/Actions';
import { AppAbility } from 'src/permisions/casl/casl-ability.factory';
import { CheckPolicies } from 'src/permisions/decorators/policies-check.decorator';
import { ParseMongoIdPipe } from 'src/shared/pipes/ParseMongoId';
import { TasksPoliciesGuard } from 'src/permisions/guards/policies.guard';
import { CreateTaskDto } from './dto/create-task.dto.';
import { FindTaskDto } from './dto/find-task.dto';
import { InputTaskDto } from './dto/input-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task';
import { TaskService } from './task.service';
import { SetCaslSubject } from '../permisions/decorators/set-casl-subject.decorator'

@Controller('tasks')
export class TaskController {

    constructor(private readonly _taskService: TaskService){}

    @Post()
    create(@Body() task: InputTaskDto, @Req() req){
        const taskWithOwner: CreateTaskDto = plainToClass(CreateTaskDto, { ...task, owner: req.user._id })
        return this._taskService.create(taskWithOwner)
    }

    @UseGuards(TasksPoliciesGuard) // valid if can edit | update | delete | read
    @SetCaslSubject(Task) // set of type entitie to validate and the type action
    @CheckPolicies((ability: AppAbility, subject: Task) => ability.can(Action.Update, subject))
    @Put(':_id')
    update(@Body() body: UpdateTaskDto, @Param(new ParseMongoIdPipe()) params: FindTaskDto){
        const task: Task = plainToClass(Task, body)
        return this._taskService.update(task, params._id)
    }

    @Get()
    findAll(@Req() req){
        return this._taskService.findAll(req.user._id)
    }

    @UseGuards(TasksPoliciesGuard)
    @SetCaslSubject(Task)
    @CheckPolicies((ability: AppAbility, subject: Task) => ability.can(Action.Read, subject))
    @Get(':_id')
    findById(@Param(new ParseMongoIdPipe()) params : FindTaskDto){
        return this._taskService.findById(params._id)
    }
}
