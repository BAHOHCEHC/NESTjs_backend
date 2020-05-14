import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
// import { configService } from './config/typeorm.config';

@Module({
  imports: [
    AuthModule,
    TasksModule,
    TypeOrmModule.forRoot(typeOrmConfig)
    // TypeOrmModule.forRoot(configService.getTypeOrmConfig())
  ],
})
export class AppModule { }
