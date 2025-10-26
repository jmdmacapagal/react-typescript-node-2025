import { Router, Request, Response } from "express";
import { TasksController } from "./tasks.controller";
import { injectable, inject } from "inversify";
import { IPartialTaskWithId, ITask } from "./tasks.interface";

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
    this.router.get("/", async (request: Request, response: Response) => {
      const tasks = await this.tasksController.handleGetTasks(
        request,
        response
      );

      response.json(tasks);
    });

    this.router.post(
      "/create",
      async (request: Request<{}, {}, ITask>, response: Response) => {
        const newTask = await this.tasksController.handlePostTasks(
          request,
          response
        );

        response.json(newTask);
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
