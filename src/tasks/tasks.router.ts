import { Router, Request, Response } from "express";

import { injectable, inject } from "inversify";
import { StatusCodes } from "http-status-codes";

import { TasksController } from "./tasks.controller";

import { IPartialTaskWithId, ITask } from "./tasks.interface";

import { createTaskValidator } from "./validators/createTask.validator";
import { getTasksValidator } from "./validators/getTasks.validator";
import { validationResult } from "express-validator";

@injectable()
export class TasksRouter {
  public router: Router;

  constructor(
    @inject(TasksController) private tasksController: TasksController
  ) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      "/",
      getTasksValidator,
      async (request: Request, response: Response) => {
        const result = validationResult(request);
        console.log(result);
        console.log(request.query);

        const tasks = await this.tasksController.handleGetTasks(
          request,
          response
        );

        response.json(tasks);
      }
    );

    this.router.post(
      "/create",
      createTaskValidator,
      async (request: Request<{}, {}, ITask>, response: Response) => {
        const result = validationResult(request);

        if (result.isEmpty()) {
          const newTask = await this.tasksController.handlePostTasks(
            request,
            response
          );
          response.status(StatusCodes.CREATED);
          response.json(newTask);
        } else {
          response.status(StatusCodes.BAD_REQUEST);
          response.json({ errors: result.array() });
        }
      }
    );

    this.router.patch(
      "/update",
      async (
        request: Request<{}, {}, IPartialTaskWithId>,
        response: Response
      ) => {
        const updatedTask = await this.tasksController.handlePatchTasks(
          request,
          response
        );

        response.json(updatedTask);
      }
    );
  }
}
