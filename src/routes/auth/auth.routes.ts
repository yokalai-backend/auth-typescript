//Set up the router
import express from "express";
import errorWrapper from "../../utils/error.middleware.wrapper";

//Controllers
import registerAuth from "../../controllers/auth/register";
import loginAuth from "../../controllers/auth/login";

const authRouter = express.Router();

//Make the REST endroutes
authRouter.post("/register", errorWrapper(registerAuth));
authRouter.post("/login", errorWrapper(loginAuth));

export default authRouter;
