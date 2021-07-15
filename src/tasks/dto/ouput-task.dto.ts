import { Type } from "class-transformer";
import { IsMongoId, IsNotEmpty, IsNotEmptyObject, IsString } from "class-validator";
import * as mongoose from 'mongoose'
import { OutputUserDto } from "src/users/dto/output-user.dto";

export class OutputTaskDto {
    @IsNotEmpty()
    @IsMongoId()
    _id: mongoose.Types.ObjectId 
    
    @IsNotEmptyObject()
    @Type(() => OutputUserDto)
    owner: OutputUserDto

    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    description: string
}