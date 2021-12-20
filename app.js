import express from 'express'
import userRouter from './src/routes/user.routes.js'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './src/routes/auth.routes.js';
import productRouter from './src/routes/product.routes.js';
import categoryRouter from './src/routes/category.routes.js';
import winston from "winston";
import "winston-mongodb";
import cors from 'cors'

    


async function main() {
    dotenv.config("dotenv");
   
    const app=express()
    winston.add(
        new winston.transports.MongoDB({
          db: process.env.MONGO_URL,
          level: "error",
          options: { useUnifiedTopology: true },
        })
      );
      winston.add(
        new winston.transports.MongoDB({
          db: process.env.MONGO_URL,
          level: "info",
          options: { useUnifiedTopology: true },
        })
      );
      
      await mongoose.connect(process.env.MONGO_URL)
    app.use(express.json());
    app.use(express.urlencoded({extended:false}));
    app.use(cors())

app.use(userRouter);
app.use(authRouter);
app.use(productRouter);
app.use(categoryRouter);


app.listen(process.env.PORT,() =>{
    console.log("listening on http://localhost:" +process.env.PORT)});
}
main()