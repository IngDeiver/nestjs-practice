import { IsMongoId, IsNotEmpty, IsString } from "class-validator"

// DTO with owner
export  class FindTaskDto  {
  
    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    _id: string
}