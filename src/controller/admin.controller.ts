
import { Request, Response } from 'express';
import { UserAdminRegistrationSchema } from '../ValidationSchemas.js';
import Admin from '../models/admin.model.js';
import bcrypt from "bcryptjs";
import { z } from "zod"
import { GenerateAdminToken } from '../utils/GenerateToken.js';
import Assignment from '../models/Assigment.model.js';
import mongoose from 'mongoose';

export const age = 1000*60*60*24*7; //age for token expiration

// a Utility function that generates a status for the Assignment when admin checks all his tagged assignments
function generateStatus(accepted: boolean, rejected: boolean): string {
  if (!accepted && !rejected) {
    return "pending"
  }
  else if (accepted) {
    return "Accepted"
  } else {
    return "Rejected"
  }
}

// Admin logout by removing the httpOnly Cookie
export const Adminlogout = (req:Request,res:Response):void=>{
  try{
    res.clearCookie("token")
    res.status(200).json({message:"logout done"})
  }catch(error){
    res.status(500).json({message:"internal server error"})
  }
}

//Function for registering the Admin
export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const validatedData = UserAdminRegistrationSchema.parse(req.body); //validating the Input using Zod
    const { name, email, password } = validatedData;
    const hashpassword = await bcrypt.hash(password.trim(), 10);
    const newUser = new Admin({ name, email, password: hashpassword });
    await newUser.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error: any) {
    if (error.code === 11000) {   //Catching the Unique constraint error
      const field = Object.keys(error.keyValue)[0];
      res.status(400).json({ error: `User with ${field} already exists` });
      return;
    }
    if (error instanceof z.ZodError) {
      res.status(400).json({       // INput validation Error
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

// function for logging in the admin
export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    if(!password){
      res.status(400).json({message:"PLease include a password"})
      return
    }
    let Myadmin;
    /*Since the user can use email or userId to login so we can check if its a email 
    or username and try to log in using that 
    */
    if (req.body.isEmail===true) {  
      Myadmin = await Admin.findOne({ email: req.body.email });
    } else {
      Myadmin = await Admin.findOne({ name: req.body.userId });
    }
    if (!Myadmin) {
      res.status(401).json({ "message": "invalid username or password" });
      return
    }
    const validpassword = await bcrypt.compare(password.trim(), Myadmin.password);//comparing passwords
    if (!validpassword) {
      res.status(401).json({ "message": "incorrect password" });
      return
    }
    /*
    Generaing token and send that token to the client using httpOnly cookies 
    */
    const token = GenerateAdminToken({ userId: Myadmin.name, email: Myadmin.email }, age) 
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: age,
      sameSite: 'none'
    }).status(200).json({
      username:Myadmin.name,
      email:Myadmin.email
    });
  }
  catch (error: any) {      //Zod Errors
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

//Function for the admin to see alll the assigments tagged to him
export const viewAssignments = async (req: any, res: Response) => {
  try {
    const AdminId = req.AdminId
    const AdminExists = await Admin.findOne({ name: AdminId })
    if (!AdminExists) {
      res.status(404).json({ message: `Admin with name ${AdminId} not Found` })
      return;
    }
    const AllAssigments = (await Assignment.find({ admin: AdminId })).map(l => (
      {
        id:l._id,
        userId: l.userId,
        task: l.task,
        admin: l.admin,
        status: generateStatus(l.accepted, l.rejected),
        date:new Date(l.createdAt!)
      }
    )
    )
    res.status(200).json(AllAssigments)

  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const acceptAssignment = async (req: Request, res: Response) => {
  try{
    const id = req.params.id
    if(!id){
      res.status(400).json({ message: 'Assignemnt id not present'});
      return
    }
    if (!mongoose.Types.ObjectId.isValid(id as string)) {
     res.status(400).json({ message: 'Invalid ObjectId'});
     return 
    }
    // Find the assignment by its ObjectId (_id)
    const assignment = await Assignment.findById(id);

    if (!assignment) {
       res.status(404).json({ message: 'Assignment not found' });
       return
    }
    if(assignment.accepted){
      res.status(409).json({message:"Assignment already accepted"})
      return
    }
    if(assignment.rejected){
      res.status(409).json({message:"Assignment was rejected earlier so cannot accept it after rejection"})
      return
    }
    assignment.accepted=true;
    await assignment.save()
    res.status(201).json({message:"assignment accepted"})

  }
  catch(err){
    res.status(500).json({message:"internal server error"})
  }
};


export const rejectAssignment = async (req: Request, res: Response) => {
  try{
    const id = req.params.id
    if(!id){
      res.status(400).json({ message: 'Assignemnt id not present'});
      return
    }
    if (!mongoose.Types.ObjectId.isValid(id as string)) {
     res.status(400).json({ message: 'Invalid ObjectId'});
     return 
    }
    // Find the assignment by its ObjectId (_id)
    const assignment = await Assignment.findById(id);

    if (!assignment) {
       res.status(404).json({ message: 'Assignment not found' });
       return
    }
    if(assignment.accepted){
      res.status(409).json({message:"Assignment already accepted,you cannot reject it after accepting"})
      return
    }
    if(assignment.rejected){
      res.status(409).json({message:"Assignment already rejected"})
      return
    }
    assignment.rejected=true
    await assignment.save()
    res.status(201).json({message:"assignment rejected"})
  }
  catch(err){
    res.status(500).json({message:"internal server error"})
  }
};
