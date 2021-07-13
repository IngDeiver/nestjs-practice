import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Task } from "src/tasks/task";
import { User, UserDocument } from "src/users/user";
import { UserService } from "src/users/user.service";
import { AppAbility, CaslAbilityFactory, Subjects } from "./casl/casl-ability.factory";
import { CHECK_POLICIES_KEY } from "./policies-check.decorator";
import { PolicyHandler } from "./policyHandler";
import { plainToClass } from 'class-transformer';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
    private readonly _userService: UserService
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
    const subject: Subjects = plainToClass(Task, request.body)
    const ability = this.caslAbilityFactory.createForUser(user);

    return  policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability, subject),
    );
    
 
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility, subject: Subjects) {
    return handler(ability, subject);
  }
}