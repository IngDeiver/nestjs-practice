import { AppAbility, Subjects } from "./casl/casl-ability.factory";

export type PolicyHandler = (ability: AppAbility, subject: Subjects) => boolean; 