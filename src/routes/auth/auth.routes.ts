//Set up the router
import express from "express";
import errorWrapper from "../../utils/error.middleware.wrapper";
import verifyToken from "../../middleware/verifyToken";

//Controllers
import registerAuth from "../../controllers/auth/register";
import loginAuth from "../../controllers/auth/login";
import refreshAuth from "../../controllers/refresh.auth";

const authRouter = express.Router();

//Make the REST endroutes
authRouter.post("/register", errorWrapper(registerAuth));
authRouter.post("/login", errorWrapper(loginAuth));

//Refresh token
authRouter.post("/refresh", errorWrapper(refreshAuth));

//Protected route
authRouter.use(verifyToken);
authRouter.get("/data");

export default authRouter;
