import "dotenv/config";
import express from "express";
import cors from "cors";
//import "dotenv/config"; moving it to top as it is throwing error as nodemailer is running before it
import cookieParser from "cookie-parser";

import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from "./routes/userRoutes.js";

const app= express();
const port=process.env.PORT||4000

connectDB();


app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

//API endpoints
app.get('/',(req,res)=> res.send("API Working"));
app.use('/api/auth',authRouter)//path for postman
app.use('/api/user',userRouter)//from userRoutes.js
app.get('/',(req,res)=>{
    res.send("API working");
})

app.listen(4000,()=>{
 console.log("This server is running on port 4000");
})