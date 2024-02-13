import { Request, Response } from "express";

import { parse } from "csv-parse/sync";
import { UserInterface } from "../../datatypes/interfaces";

import FileService from "./service";

const service = new FileService();

export default class FileController {

  async ProcessFile(req: Request, res: Response) {
    const file = req.file;

    if (!file) {
      return res.status(500).json({ message: "No csv file uploaded." });
    }
    if(file.originalname && !file.originalname.endsWith(".csv")){
      return res.status(500).json({ message: "invalid file uploaded." });
    }

    try {
      const records: UserInterface[] = parse(file.buffer.toString("utf8"), {
        columns: true,
        skip_empty_lines: true,
        delimiter: ",",
      });

     await service.createMany(records);

    } catch (error) {
      res.json({ message: error }).status(500);
    }

    res.json({ message: "The file was uploaded successfully." }).status(200);
  }
}
