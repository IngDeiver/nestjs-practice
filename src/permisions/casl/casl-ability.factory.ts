import { Ability, AbilityBuilder, AbilityClass, ExtractSubjectType, InferSubjects } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { Task } from "src/tasks/task";
import { UserDocument } from "src/users/user";
import { Action } from './Actions'

export type Subjects = InferSubjects<typeof Task > | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {

  createForUser(user: UserDocument, propToValidate: string = null) { // create habilities for users
    const { can, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(Ability as AbilityClass<AppAbility>);
    const condiction = { [propToValidate ? propToValidate : 'owner']: user._id }
    // See https://casl.js.org/v5/en/advanced/typescript#nested-fields-with-dot-notation
    can([Action.Read, Action.Delete, Action.Update], Task, condiction);

    return build({
      // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
      detectSubjectType: item => item.constructor as ExtractSubjectType<Subjects>
    });
  }
}