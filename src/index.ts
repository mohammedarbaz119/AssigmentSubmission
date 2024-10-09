import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import UserRouter from './routes/user.route.js';
import parser from 'cookie-parser'
import AdminRouter from './routes/admin.route.js';
dotenv.config() //dotenv config for loading env files
const app = express()
app.use(parser())  //cookie parser for parsing cookies
app.use(cors())  //cors for cors cross site requests
app.use(express.json())  //handling JSON bodies
app.get("/", (req: Request, res: Response) => {
    res.send("api is alive")
})
app.use("/users",UserRouter)   // handling User Routes
app.use("/admin",AdminRouter)  //handling Admin Routes

mongoose.connect(process.env.MONGO_URL as string, { dbName: "notes", bufferCommands: false }) //Running app only when the database is connected to ensure no false objects are created
    .then(() => app.listen(4000, () => {
        console.log("sevrver is on port 4000")
    }))
    .catch(err => {
        console.log("connect to database failed")
        console.error(err)
    })