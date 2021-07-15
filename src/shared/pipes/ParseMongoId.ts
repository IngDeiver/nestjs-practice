import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import * as mongoose from 'mongoose'

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  transform(params: any, { metatype }: ArgumentMetadata) {
    console.log("metatype: ", metatype);
    console.log("params: ", params);
    params._id = mongoose.Types.ObjectId(params._id)
    return params
  }
}
