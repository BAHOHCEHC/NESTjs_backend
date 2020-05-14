import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

@Injectable()
export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
  ]
  transform(value: any) {
    if (!this.isStatusValid(value.toUpperCase())) {
      throw new BadRequestException(`BAD TRY invalid status`)
    }
    return value;
  }

  private isStatusValid(status: any) {
    const indx = this.allowedStatuses.indexOf(status);
    return indx !== -1;
  }
}
