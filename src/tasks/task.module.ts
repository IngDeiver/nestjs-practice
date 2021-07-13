import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PermisionsModule } from 'src/permisions/permisions.module';
import { TaskSchema } from 'src/tasks/task';
import { UserModule } from 'src/users/user.module';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'tasks', schema: TaskSchema}]),
        PermisionsModule,
        UserModule
    ],
    controllers: [TaskController],
    providers: [TaskService]
})
export class TaskModule {}
