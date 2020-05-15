import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, Param, ParseIntPipe, UsePipes, Post, ValidationPipe, Body, Delete, Patch, Query, UseGuards } from '@nestjs/common';


import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private taskService: TasksService) { }

    @Get()
    getTasks(
        @Query(ValidationPipe) filterDto: GetTaskFilterDto,
        @GetUser() user: User,
    ) {
        return this.taskService.getTasks(filterDto, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() createTaskDTO: CreateTaskDto,
        @GetUser() user: User,
    ): Promise<Task> {
        return this.taskService.createTask(createTaskDTO, user);
    }

    @Get('/:id')
    getTaskById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
    ): Promise<Task> {
        return this.taskService.getTaskById(id, user);
    }

    @Delete('/:id')
    deleteTask(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
    ): Promise<void> {
        return this.taskService.deleteTaskById(id, user);
    }

    @Patch('/:id')
    updateTaskStatus(
        @Param('id') id: number,
        @GetUser() user: User,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus): Promise<Task> {
        return this.taskService.updateTaskStatus(id, status, user);
    }

    // @Get()
    // getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Task[] {
    //     if (Object.keys(filterDto).length) {
    //         return this.taskService.getTasksWithFilters(filterDto);
    //     } else {
    //         return this.taskService.getAllTasks();
    //     }
    // }

    // @Get('/:id')
    // getTaskById(
    //     @Param('id') id: string,
    // ): Task {        
    //     return this.taskService.getTaskById(id);
    // }

    // @Delete('/:id')
    // removeTask(
    //     @Param('id') id: string,
    // ): void {
    //     this.taskService.deleteTaskById(id);
    // }

    // @Patch('/:id')
    // updateTaskStatus(
    //     @Param('id') id: string,
    //     @Body('status', TaskStatusValidationPipe) status: TaskStatus): Task {
    //     return this.taskService.updateTaskStatus(id, status);
    // }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createTask(@Body() createTaskDTO: CreateTaskDto): Task {
    //     return this.taskService.createTask(createTaskDTO)
    // }
    // @Post()
    // createTask(
    //     @Body('title') title: string,
    //     @Body('description') description: string
    // ): Task {
    //     return this.taskService.createTask(title, description)
    // }




}
