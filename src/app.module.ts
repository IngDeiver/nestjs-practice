import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { TaskModule } from './tasks/task.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { PermisionsModule } from './permisions/permisions.module';

@Module({
  imports: [UserModule, TaskModule, ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV}.env`
    }), 
    MongooseModule.forRootAsync({
    imports:[ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get<string>('DB_URI'),
      useCreateIndex: true,
      useFindAndModify: false
    }),
    inject: [ConfigService]
  }), AuthModule, PermisionsModule],
  providers: [{
    provide: APP_GUARD,
    useClass: JwtAuthGuard
  }]
})
export class AppModule {}
