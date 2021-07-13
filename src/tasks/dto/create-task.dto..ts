import { PartialType,  } from "@nestjs/mapped-types"
import { IsNotEmpty } from "class-validator"
import { UserDocument } from "src/users/user"
import { InputTaskDto } from "./input-task.dto"


export  class CreateTaskDto extends PartialType(InputTaskDto) {
  
    @IsNotEmpty()
    owner: UserDocument
}