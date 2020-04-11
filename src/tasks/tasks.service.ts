import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskWithFilter(filterDto: GetTaskFilterDto): Task[] {
        const { status, search } = filterDto;

        let tasks = this.getAllTasks();

        if (status) {
            tasks = tasks.filter(task => task.status !== status);
        }
        if (search) {
            tasks = tasks.filter(task =>
                task.title.includes(search) || task.description.includes(search));
        }
        return tasks;
    }

    getTaskById(id: string): Task {
        return this.tasks.find(task => task.id === id);
    }

    deleteTaskById(id: string): Task[] {
        // first variant
        // const task = this.tasks.find(task => task.id === id);
        // const indx = this.tasks.indexOf(task);
        // this.tasks.splice(indx, 1);

        // second variant
        this.tasks = this.tasks.filter(task => task.id !== id);
        return this.tasks;
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.tasks.find(task => task.id === id);
        task.status = status;
        return task;
    }

    createTask(createTaskDTO: CreateTaskDto) {
        const { title, description } = createTaskDTO;

        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        };

        this.tasks.push(task)
        return task;
    }
}
