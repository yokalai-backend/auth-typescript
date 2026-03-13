//Set up the router
import express from "express";

const authRouter = express.Router();

//Make the REST endroutes
authRouter.post("/register");

export default authRouter;
