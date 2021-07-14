import { IsNotEmpty, IsString } from "class-validator"

// DTO without owner
export  class InputTaskDto  {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    description: string
}