import { Container } from "inversify";
import { TasksController } from "../tasks/tasks.controller";
import { UserController } from "../user/user.controller";
import { TasksRouter } from "../tasks/tasks.router";

export const container: Container = new Container();

container.bind<TasksController>(TasksController).toSelf().inTransientScope();
container.bind<UserController>(UserController).toSelf().inTransientScope();

container.bind<TasksRouter>(TasksRouter).toSelf().inTransientScope();
