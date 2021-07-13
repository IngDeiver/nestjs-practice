import { PartialType, } from "@nestjs/mapped-types"
import { Type } from "class-transformer"
import { IsDefined, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, ValidateNested } from "class-validator"
import { InputUserDto } from "src/users/dto/input-user.dto"
import { InputTaskDto } from "./input-task.dto"



export class UpdateTaskDto extends PartialType(InputTaskDto) {
    @IsNotEmpty()
    @IsString()
    _id: string

    @IsString()
    owner: string
}