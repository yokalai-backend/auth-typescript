//Set up the router
import express from "express";
import errorWrapper from "../../utils/error.middleware.wrapper";
import verifyToken from "../../middleware/verifyToken";

//Controllers
import registerAuth from "../../controllers/auth/register";
import loginAuth from "../../controllers/auth/login";
import refreshAuth from "../../controllers/refresh.auth";
import getUserData from "../../controllers/test/user.data";

const authRouter = express.Router();

//Make the REST endroutes
authRouter.post("/register", errorWrapper(registerAuth));
authRouter.post("/login", errorWrapper(loginAuth));

//Refresh token
authRouter.get("/refresh", refreshAuth);

//Protected route
authRouter.use("/protected", verifyToken);
authRouter.get("/protected/data", errorWrapper(getUserData));

export default authRouter;
