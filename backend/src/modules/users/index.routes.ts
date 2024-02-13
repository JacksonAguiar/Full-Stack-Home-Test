import express from "express";

import Controller from "./controller";
const UsersRouter = express();

const controller = new Controller();

UsersRouter.get("/", controller.GetUsers);

export default UsersRouter;