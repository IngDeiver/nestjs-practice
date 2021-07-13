import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class JwtPayload {
    @IsNotEmpty()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsString()
    sub: string

    @IsNotEmpty()
    @IsNumber()
    iat: number

    @IsNotEmpty()
    @IsNumber()
    exp: number
}