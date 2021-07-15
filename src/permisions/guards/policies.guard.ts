import { 
      BadRequestException, CanActivate, 
      ExecutionContext, Injectable,
      NotFoundException, Type 
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Task } from "src/tasks/task";
import { UserDocument } from "src/users/user";
import { UserService } from "src/users/user.service";
import { AppAbility, CaslAbilityFactory } from "../casl/casl-ability.factory";
import { CHECK_POLICIES_KEY } from "../decorators/policies-check.decorator";
import { PolicyHandler } from "../policyHandler";
import { plainToClass } from 'class-transformer';
import { TaskService } from "../../tasks/task.service";
import { FindTaskDto } from "../../tasks/dto/find-task.dto";
import * as mongoose from 'mongoose'
import { SUBJECT_TYPE_KEY } from "src/permisions/decorators/set-casl-subject.decorator";

@Injectable()
export class TasksPoliciesGuard implements CanActivate {

  private _policyHandlers: PolicyHandler[] = [];
  private _subjectType: Type = null;

  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
    private readonly _userService: UserService,
    private readonly _taskService: TaskService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this._policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

      this._subjectType =
      this.reflector.get<Type>(
        SUBJECT_TYPE_KEY,
        context.getHandler(),
      ) || null;
      

    const request = context.switchToHttp().getRequest();
    const userId: mongoose.Types.ObjectId  = new mongoose.Types.ObjectId(request.user._id)
    const user: UserDocument = await this._userService.finById(userId)
    const ability = this.caslAbilityFactory.createForUser(user);
    const params = request.params
    let taskDocument;

    if(request.method !== "POST"){
      this.validateIdFromParams(params)
      const taskId:mongoose.Types.ObjectId = new mongoose.Types.ObjectId(params._id)
      taskDocument = await  this._taskService.findById(taskId)
      if(!taskDocument){throw new NotFoundException("Task not found")}
    }

    // create a subjec with only owner propertie for validate with casl
    const subject = plainToClass(this._subjectType, { owner: taskDocument.owner._id }) 

    return  this._policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability, subject),
    );
    
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility, subject: Task) {
    return handler(ability, subject);
  }

  private validateIdFromParams(params: FindTaskDto){
    if(!params._id || !mongoose.Types.ObjectId.isValid(params._id )){
      throw new BadRequestException("Bad request, _id is required and should be ObjectId")
    }
  }
}