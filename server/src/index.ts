import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Sequelize } from "sequelize-typescript";

import config from "./config";
import contactRouter from "./routes/contact.route";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("assets"));
app.use("/contacts", contactRouter);

const sequelize = new Sequelize({
  dialect: "sqlite",
  database: "movies",
  storage: __dirname + "contact.db",
  models: [__dirname + "/models"],
});

(async () => {
  await sequelize.sync({ force: false });
})();

app.listen(config.port, () => {
  console.log(`The server is running on port ${config.port}.`);
});
