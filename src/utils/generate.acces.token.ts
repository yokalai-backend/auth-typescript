//Generate the access token!
import jwt from "jsonwebtoken";
import env from "../config/env";

export default function generateAccessToken(user: any) {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
      type: "access",
    },
    env.JWT_ACCESS_SECRET,
    { expiresIn: "1m" },
  );
}
