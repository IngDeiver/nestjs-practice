import { IsJWT, IsNotEmpty, IsString } from "class-validator";

export class JwtDto {
    @IsNotEmpty()
    @IsString()
    @IsJWT()
    access_token: string

    @IsNotEmpty()
    @IsString()
    @IsJWT()
    refresh_token: string
}