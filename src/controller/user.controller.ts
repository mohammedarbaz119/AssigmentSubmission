//Controller file for the User Routes
import { Request, Response } from 'express';
import { AssignmentZodSchema, UserAdminRegistrationSchema } from '../ValidationSchemas.js';
import User from '../models/user.model.js';
import bcrypt from "bcryptjs";
import { z } from "zod"
import { GenerateUserToken } from '../utils/GenerateToken.js';
import Admin from '../models/admin.model.js';
import Assignment from '../models/Assigment.model.js';
import mongoose, { ObjectId } from 'mongoose';

export const age = 1000*60*60*24*7;

/**
 * Registers a new user in the system.
 * Validates registration data, hashes the password, and saves the new user to the database.
 * Responds with success or appropriate error messages.
 */
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = UserAdminRegistrationSchema.parse(req.body);

    const { name, email, password } = validatedData;
    const hashpassword = await bcrypt.hash(password, 10);
    const newUser = new User({ userId: name, email, password: hashpassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error: any) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      res.status(400).json({ error: `User with ${field} already exists` });
      return;
    }
    if (error instanceof z.ZodError) {
      res.status(400).json({
        errors: error.errors.map(l => ({
          field: l.path[0],
          message: l.message
        }))
      });
      return;
    }
    console.log(error)
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Authenticates a user and creates a session.
 * Finds the user, validates credentials, generates a JWT token, and sets it as an HTTP-only cookie.
 * Responds with user data or authentication failure message.
 */
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    let user;
    if (req.body.isEmail) {
      user = await User.findOne({ email: req.body.email }).populate({path:"assignments"});
    } else {
      user = await User.findOne({ userId: req.body.userId }).populate({path:"assignments"});
    }
    if (!user) {
      res.status(401).json({ "message": "invalid username or password" });
      return
    }
    const validpassword = await bcrypt.compare(password, user.password);
    if (!validpassword) {
      res.status(401).json({ "message": "incorrect password" });
      return
    }
    
    const token = GenerateUserToken({ userId: user.userId, email: user.email },age)
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: age,
      sameSite: 'none'
    }).status(200).json({
      name:user.userId,
      email:user.email,
      assigments:user.assignments
    });
  }
  catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        errors: error.errors.map(l => ({
          field: l.path[0],
          message: l.message
        }))
      });
      return;
    }
    console.log(error)
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Logs out a user by clearing the session cookie.
 * Clears the 'token' cookie and sends a success response.
 */
export const logout = (req:Request,res:Response):void=>{
  try{
    res.clearCookie("token")
    res.status(200).json({message:"logout done"})
  }catch(error){
    res.status(500).json({message:"internal server error"})
  }
}

/**
 * Uploads a new assignment for a user.
 * Validates assignment data, checks user and admin existence, creates a new assignment,
 * associates it with the user, and responds with success or error messages.
 */
export const uploadAssignment = async (req: any, res: Response) => {
  try {
    const validatedData = AssignmentZodSchema.parse(req.body);
    const { task, admin } = validatedData
    const userExists = await User.findOne({ userId: req.userId })
    if (!userExists) {
      res.status(404).json({ message: "User not Found" })
      return;
    }
    const AdminExists = await Admin.findOne({ name: admin })
    if (!AdminExists) {
      res.status(404).json({ message: `Admin with name ${admin} not Found` })
      return;
    }
    const asignment = await Assignment.create({userId:req.userId,task:task,admin:admin,accepted:false,rejected:false})
    userExists.assignments.push(asignment._id as mongoose.Types.ObjectId)
    userExists.save()
    res.status(201).json({message:"Assigment sent"})
  }
  catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        errors: error.errors.map(l => ({
          field: l.path[0],
          message: l.message
        }))
      });
      return;
    }
    res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * Fetches all admin names from the database.
 * Retrieves all admin documents, extracts their names, and sends the list in the response.
 */
export const fetchAdmins = async (req: Request, res: Response) => {
  try{
  const allAdmins =  (await Admin.find({})).map(l=>l.name)
  res.status(200).json({allAdmins})
  }catch(error){
    res.status(500).json({ message: 'Internal server error' });
  }  
};