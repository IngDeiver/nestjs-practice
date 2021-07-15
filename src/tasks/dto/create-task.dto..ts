import { PartialType,  } from "@nestjs/mapped-types"
import { IsMongoId, IsNotEmpty } from "class-validator"
import { InputTaskDto } from "./input-task.dto"
import * as mongoose from 'mongoose'

// DTO with owner for save in database
export  class CreateTaskDto extends PartialType(InputTaskDto) {
  
    @IsNotEmpty()
    @IsMongoId()
    owner: mongoose.Types.ObjectId 
}