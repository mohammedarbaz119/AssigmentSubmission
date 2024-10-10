import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { TokenPayload } from "./GenerateToken.js";

// Middleware Function for verifying user tokens and Authenticatiion 
export const UserAuth = (req: any, res: Response, next: NextFunction) => {
 
  try {
    const token = req.cookies.token;
    if (!token) {
       res.status(401).json({ message: "Unauthorized no token" });
       return
      }
    const decoded: TokenPayload = jwt.verify(token, process.env.SECRET) as TokenPayload;
    req.userId = decoded.userId;
    next();

  } catch (err) {
    res.clearCookie("token");
    res.status(401).json({ message: "unauthorized"});
    return
    }
}

// Middleware Function for verifying Admin tokens and Authenticatiion of Admins  
export const AdminAuth = (req: any, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ message: "Unauthorized no token" });
    return
  }
  try {
    const decoded: TokenPayload = jwt.verify(token, process.env.ADMIN_SECRET) as TokenPayload;
    req.AdminId = decoded.userId;
  } catch (err) {
    res.clearCookie("token");
   res.status(401).json({ message: "Unauthorized" });
   return
  }
  next();
}