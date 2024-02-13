import express from "express";
import multer from "multer";
import Controller from "./controller";

const FilesRouter = express();

const controller = new Controller();
const upload = multer()

FilesRouter.post("/", upload.single("file"), controller.ProcessFile);

export default FilesRouter;