import { PartialType, } from "@nestjs/mapped-types"
import { IsMongoId, IsNotEmpty,IsNotEmptyObject,IsString, ValidateNested } from "class-validator"
import { UserDocument } from "src/users/user"
import { InputTaskDto } from "./input-task.dto"


// DTO require owner and _id
export class UpdateTaskDto extends PartialType(InputTaskDto) {
    @IsNotEmpty()
    @IsString()
    _id: string

    @IsNotEmpty()
    @IsMongoId()
    owner: string
}