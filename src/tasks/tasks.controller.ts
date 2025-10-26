import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { UserController } from "../user/user.controller";
import { Task } from "./tasks.schema";
import { ITask } from "./tasks.interface";
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

  public handlePatchTasks() {
    return {
      title: "New Task",
      description: "Task description",
    };
  }
}
