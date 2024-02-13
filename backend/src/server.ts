import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import routes from "./router/index.router";

const PORT = 3000;
const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api",routes)

app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
    