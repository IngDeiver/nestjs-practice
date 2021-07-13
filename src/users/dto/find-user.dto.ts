import { OmitType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";

export class  FindUserDto  extends OmitType(CreateUserDto, ['username']) {}