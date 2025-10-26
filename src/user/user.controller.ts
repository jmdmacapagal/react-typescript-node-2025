import { injectable } from "inversify";

@injectable()
export class UserController {
  constructor() {}

  public getUser() {
    return {
      firstName: "JM",
      lastName: "Macapagal",
      email: "jm@example.com",
    };
  }
}
