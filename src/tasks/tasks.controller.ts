import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { UserController } from "../user/user.controller";
import { Task } from "./tasks.schema";
import { ITask, IPartialTaskWithId } from "./tasks.interface";
import { Document } from "mongoose";

@injectable()
export class TasksController {
  constructor(@inject(UserController) private userController: UserController) {}

  public async handleGetTasks(request: Request, response: Response) {
    const tasks = await Task.find();

    return tasks;
  }

  public async handlePostTasks(
    request: Request<{}, {}, ITask>,
    response: Response
  ) {
    const task: Document<unknown, any, ITask> = new Task(request.body);

    await task.save();

    return task;
  }

  public async handlePatchTasks(
    request: Request<{}, {}, IPartialTaskWithId>,
    response: Response
  ) {
    const task = await Task.findById(request.body._id);

    if (task) {
      task.title = request.body.title ? request.body.title : task.title;
      task.description = request.body.description
        ? request.body.description
        : task.description;
      task.status = request.body.status ? request.body.status : task.status;
      task.priority = request.body.priority
        ? request.body.priority
        : task.priority;
      task.dueDate = request.body.dueDate ? request.body.dueDate : task.dueDate;

      await task.save();
    }

    return task;
  }
}
