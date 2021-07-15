import { PartialType, } from "@nestjs/mapped-types"
import { IsMongoId, IsNotEmpty } from "class-validator"
import { InputTaskDto } from "./input-task.dto"
import * as mongoose from 'mongoose'

// DTO require owner and _id
export class UpdateTaskDto extends PartialType(InputTaskDto) {
    @IsNotEmpty()
    @IsMongoId()
    owner: mongoose.Types.ObjectId // danger?
}