//Use express for making the server.
import { config } from "dotenv";
config();

import express from "express";
import cors from "cors";
import errorGlobalHandler from "./middleware/error.handler";
import { router } from "./config/routers";

//Use server middleware by combine express and cors for server.
const app = express();
app.use(express.json());
app.use(cors());

//Handle routers
app.use("/auth", router.authRtr);

//Handling error thrown from ./src
app.use(errorGlobalHandler);

//Run the server
const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => {
  console.log("Server is running at port ", PORT);
});
