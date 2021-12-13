import { Router } from "express";
import Category from "../model/category.model.js";
import categoryValidate from "../validations/category.validate.js";
import { isAdmin } from "../middlewares/auth.middleware.js";
import winston from "winston";

const categoryRouter = Router();

categoryRouter.post("/categories", async (req, res) => {
    try {
    await categoryValidate.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
  
  const category = new Category(req.body);
  try {
    await category.save();
  } catch (error) {
    return res.status(500).json("Unknown error occured!");
  }
 
  winston.info("porduct created");
  res.json({ message: "category has been created" });
});


categoryRouter.get("/categories", async (req, res) => {
  let categories;
  try {
    categories = await Category.find({});
  } catch (error) {
    res.status(500).json({ error: "Unknown error occured!" });
  }
  res.json(categories);
});


categoryRouter.get("/categories/:id", async (req, res) => {
  
  let category;
  try {
    category = await Category.findById(req.params.id);
  } catch (error) {
    return res.status(500).json("Unknown error occured!");
  }
  res.json(category);
});


categoryRouter.put("/categories/:id", async (req, res) => {
 
  const { id } = req.params;

  try {
    await Category.findByIdAndUpdate(id, req.body);
  } catch (error) {
    return res.status(500).json("Unknown error occured!");
  }
  res.json({ message: "Category updated" });
});


categoryRouter.delete("/categories/:id", async (req, res) => {
  try {
    await Category.findByIdAndRemove(req.params.id);
  } catch (error) {
    return res.status(500).json("Unknown error occured!");
  }
  res.json({ message: "Category has been deleted" });
});

export default categoryRouter;