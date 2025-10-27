import { checkSchema } from "express-validator";

export const createTaskValidator = checkSchema({
  title: {
    in: ["body"],
    notEmpty: true,
    errorMessage: "Title is required",
    isString: true,
    isLength: {
      options: {
        max: 100,
      },
      errorMessage: "Title can be at most 100 characters long",
    },
    trim: true,
  },
  description: {
    in: ["body"],
    notEmpty: true,
    isString: true,
    trim: true,
  },
  status: {
    in: ["body"],
    notEmpty: true,
    isIn: {
      options: [["pending", "in-progress", "completed"]],
    },
  },
  priority: {
    in: ["body"],
    notEmpty: true,
    isIn: {
      options: [["low", "normal", "high"]],
    },
  },
  dueDate: {
    in: ["body"],
    notEmpty: true,
    isISO8601: true,
  },
});
