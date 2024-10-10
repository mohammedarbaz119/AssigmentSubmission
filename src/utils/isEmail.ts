import { NextFunction,Response } from "express";

//Util function for testing for input if its a email or not
const isEmail = (input:string) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  // Middleware to check if user/Admin has entered a email or username for the purpose of login 
   const validateUsernameOrEmail = (req:any, res:Response, next:NextFunction):void => {
    const { usernameOrEmail } = req.body;
  
    if (!usernameOrEmail) {
       res.status(400).json({ message: "Username or email is required" });
       return
    }
  
    req.body.isEmail = isEmail(usernameOrEmail);
  
    if (req.body.isEmail) {
      req.body.email = usernameOrEmail.trim();
    } else {
      req.body.userId = usernameOrEmail.trim();
    }
    next();
  };
  export default validateUsernameOrEmail;