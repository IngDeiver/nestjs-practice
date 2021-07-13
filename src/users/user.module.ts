import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDocument, UserSchema } from './user';
import * as bcrypt from 'bcrypt';
import { HookNextFunction } from 'mongoose';

@Module({
  imports: [MongooseModule.forFeatureAsync([
    {
      name: 'users',
      useFactory: () => {
        const schema = UserSchema;

        schema.pre('save', async function (next: HookNextFunction) {
          try {
            
            const user: UserDocument = (this as UserDocument)
            console.log(user.isModified('password'));
            
            // save only is new doc or update password
            if (!user.isModified('password')) {
              return next();
            }

            const hash: string = await bcrypt.hash(user.password, 10)
            user.password = hash
            next()
          } catch (error) {
            next(error)
          }
        });
        return schema
      }
    }
  ])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule { }
