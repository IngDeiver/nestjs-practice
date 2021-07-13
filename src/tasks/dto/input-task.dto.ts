import { IsNotEmpty, IsString } from "class-validator"

export  class InputTaskDto  {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    description: string
}