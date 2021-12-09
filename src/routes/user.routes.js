import { Router } from "express";

const userRouter =Router()
userRouter.get("/users",(req,res)=>{
    res.send("hello users")
})

export default userRouter