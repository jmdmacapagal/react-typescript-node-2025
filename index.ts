import "reflect-metadata";
import express, { Express } from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

import { addRoutes } from "./src/config/routes.config";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

addRoutes(app);

async function bootstrap() {
  if (!process.env.DATABASE_URL || !process.env.DATABASE_NAME) {
    throw new Error(
      "DATABASE_URL or DATABASE_NAME is not defined in environment variables"
    );
  }

  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      dbName: process.env.DATABASE_NAME,
    });

    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

bootstrap();
