import { IsMongoId, IsNotEmpty } from "class-validator"
import * as mongoose from 'mongoose'

// DTO with owner
export  class FindTaskDto  {
  
    @IsNotEmpty()
    @IsMongoId()
    _id: mongoose.Types.ObjectId 
}