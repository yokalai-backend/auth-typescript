//Use express for making the server.
import { config } from "dotenv";
config();

import express from "express";
import cors from "cors";

//Use server middleware by combine express and cors for server.
const app = express();
app.use(express.json());
app.use(cors());

//Run the server
const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => {
  console.log("Server is running at port ", PORT);
});
