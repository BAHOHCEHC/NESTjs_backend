import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";
import { TaskStatus } from './task-status.enum';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async createTask(createTaskDTO: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDTO;
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        await task.save();
        return task;
    }

    async getTasks(filterDto: GetTaskFilterDto): Promise<Task[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task');

        if (status) {
            query.andWhere('task.status = :status', { status })
        }

        if (search) {
            query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%${search}%` })
        }

        const tasks = query.getMany()
        return tasks;
    }

}