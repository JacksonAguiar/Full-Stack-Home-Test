import express from "express";
import FilesRouter from "../modules/file/index.routes";
import UsersRouter from "../modules/users/index.routes";


const routes = express();

routes.use("/files", FilesRouter);
routes.use("/users", UsersRouter);

export default routes;