import { PartialType,  } from "@nestjs/mapped-types"
import { IsMongoId, IsNotEmpty, IsString } from "class-validator"
import { InputTaskDto } from "./input-task.dto"

// DTO with owner
export  class CreateTaskDto extends PartialType(InputTaskDto) {
  
    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    owner: string
}