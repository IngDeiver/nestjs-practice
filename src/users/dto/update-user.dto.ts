import { PartialType } from '@nestjs/mapped-types'
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator'
import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    _id: string
}