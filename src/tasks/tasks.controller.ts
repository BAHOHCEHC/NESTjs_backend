import { CreateTaskDto } from './dto/create-task.dto';
import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) { }

    @Get()
    getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
        if (Object.keys(filterDto).length) {
            return this.taskService.getTaskWithFilter(filterDto);
        } else {
            return this.taskService.getAllTasks();
        }

    }

    @Get('/:id')
    getTaskById(
        @Param('id') id: string,
    ): Task {
        return this.taskService.getTaskById(id);
    }

    @Delete('/:id')
    removeTask(
        @Param('id') id: string,
    ): Task[] {
        return this.taskService.deleteTaskById(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status') status: TaskStatus): Task {
        return this.taskService.updateTaskStatus(id, status);
    }

    @Post()
    createTask(@Body() createTaskDTO: CreateTaskDto): Task {
        return this.taskService.createTask(createTaskDTO)
    }
    // @Post()
    // createTask(
    //     @Body('title') title: string,
    //     @Body('description') description: string
    // ): Task {
    //     return this.taskService.createTask(title, description)
    // }




}
