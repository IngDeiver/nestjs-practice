import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PermisionsModule } from 'src/permisions/permisions.module';
import { TaskSchema, TASK_SCHEMA } from 'src/tasks/task';
import { UserModule } from 'src/users/user.module';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
    imports: [
        UserModule,
        MongooseModule.forFeature([{ name: TASK_SCHEMA, schema: TaskSchema}]),
        PermisionsModule,
    ],
    controllers: [TaskController],
    providers: [TaskService]
})
export class TaskModule {}
