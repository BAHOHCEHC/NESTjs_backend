import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskRepository } from './task.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository, ) { }


    async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto);
    }

    async  createTask(createTaskDTO: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDTO);
    }

    async  deleteTaskById(id: number): Promise<void> {
        const result = await this.taskRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException('NOT FOUND IDS');
        }
    }

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);
        if (!found) {
            throw new NotFoundException('NOT FOUND IDS');
        }
        return found;
    }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        await task.save();
        return task;
    }


    // getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    // getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
    //     const { status, search } = filterDto;
    //     let tasks = this.getAllTasks();

    //     if (status) {
    //         tasks = tasks.filter(task => task.status === status);
    //     }

    //     if (search) {
    //         tasks = tasks.filter(task =>
    //             task.title.includes(search) ||
    //             task.description.includes(search),
    //         );
    //     }
    //     return tasks;
    // }

    // getTaskById(id: string): Task {
    //     const found = this.tasks.find(task => task.id === id);

    //     if (!found) {
    //         throw new NotFoundException('NOT FOUND IDS');
    //     }
    //     return found;
    // }

    // deleteTaskById(id: string): void {
    //     // first variant
    //     // const task = this.tasks.find(task => task.id === id);
    //     // const indx = this.tasks.indexOf(task);
    //     // this.tasks.splice(indx, 1);

    //     // second variant
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter(task => task.id !== found.id);

    //     // return this.tasks;
    // }

    // updateTaskStatus(id: string, status: TaskStatus): Task {
    //     const task = this.tasks.find(task => task.id === id);
    //     task.status = status;
    //     return task;
    // }    

    // createTask(createTaskDTO: CreateTaskDto) {
    //     const { title, description } = createTaskDTO;

    //     const task: Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN
    //     };

    //     this.tasks.push(task)
    //     return task;
    // }
}
