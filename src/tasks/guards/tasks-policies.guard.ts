import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Task, TaskDocument } from "src/tasks/task";
import { UserDocument } from "src/users/user";
import { UserService } from "src/users/user.service";
import { AppAbility, CaslAbilityFactory } from "../../permisions/casl/casl-ability.factory";
import { CHECK_POLICIES_KEY } from "../../permisions/policies-check.decorator";
import { PolicyHandler } from "../../permisions/policyHandler";
import { plainToClass } from 'class-transformer';
import * as mongoose from 'mongoose'
import { TaskService } from "../task.service";
import { FindTaskDto } from "../dto/find-task.dto";
import { UpdateTaskDto } from "../dto/update-task.dto";

@Injectable()
export class TasksPoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
    private readonly _userService: UserService,
    private readonly _taskService: TaskService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    const request = context.switchToHttp().getRequest();
    const userId = request.user._id
    const user: UserDocument = await this._userService.finById(userId)
    const ability = this.caslAbilityFactory.createForUser(user);

    let subject: Task;
    
    if(request.method === 'PUT'){
      this.validateIdFromBody(request.body)
      subject = plainToClass(Task, request.body)
    }else { // Get _id from params
      const params = request.params
      this.validateIdFromParams(params)
      const taskId: string = params._id
      const taskDocument:  TaskDocument = await  this._taskService.findById(taskId)
      subject = plainToClass(Task, { owner: taskDocument.owner._id })
    }  

    return  policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability, subject),
    );
    
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility, subject: Task) {
    return handler(ability, subject);
  }

  private validateIdFromBody(body: UpdateTaskDto){
    if(!body._id || !mongoose.Types.ObjectId.isValid(body._id)){
      throw new BadRequestException("Bad request, owner is required and should be ObjectId")
    }
  }

  private validateIdFromParams(params: FindTaskDto){
    if(!params._id || !mongoose.Types.ObjectId.isValid(params._id )){
      throw new BadRequestException("Bad request, _id is required and should be ObjectId")
    }
  }
}