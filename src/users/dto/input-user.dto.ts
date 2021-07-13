import { IsNotEmpty, IsString } from "class-validator";
import { CreateUserDto } from "./create-user.dto";

export class InputUserDto extends CreateUserDto {
    @IsNotEmpty()
    @IsString()
    _id: string
}