import { Router } from "express";
import User from "../model/users.model.js";
import userValidate from"../validations/user.validate.js"
import { isAdmin } from "../middlewares/auth.middleware.js";
import { isAuth } from "../middlewares/auth.middleware.js";


const userRouter =Router()


userRouter.post('/users' ,isAdmin, async(req , res)=>{
    try {
        await userValidate.validateAsync(req.body)
    } catch (error) {
        return res.status(400).json({error:error.message});
    }
   const user =new User(req.body)
   await user.save();
   res.json(user)
})

userRouter.get("/users", isAuth, async (req, res) => {
    let users;
    try {
      users = await User.find({});
    } catch (error) {
      return res.status(500).json("Unkown error occured");
    }
  
    res.json(users);
  });
  

  userRouter.get("/users/:id", isAuth, async (req, res) => {
    const { id } = req.params;
    let user;
    try {
      user = await User.findById(id);
    } catch (error) {
      return res.status(500).json("Unkown error occured");
    }
    res.json(user);
  });
  
 
  userRouter.put("/users/:id", isAuth, async (req, res) => {
    try {
      await userValidate.validateAsync(req.body);
    } catch (error) {
      return res.status(400).json(error.message);
    }
    const { id } = req.params;
    let user;
    try {
      user = await User.findByIdAndUpdate(id, req.body, { new: true });
    } catch (error) {
      return res.status(500).json("Unkown error occured");
    }
    res.json(user);
  });
  
  
  userRouter.delete("/users/:id", isAuth, async (req, res) => {
    const { id } = req.params;
    try {
      await User.findByIdAndDelete(id);
    } catch (error) {
      return res.status(500).json("Unkown error occured");
    }
    res.json({ message: "User deleted" });
  });

export default userRouter