import { Router } from "express";
import Product from "../model/product.model.js";
import productValidate from "../validations/product.validate.js";
import { isAdmin } from "../middlewares/auth.middleware.js";
import winston from "winston";

const productRouter = Router();

productRouter.post("/products", async (req, res) => {
    try {
    await productValidate.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
  
  const product = new Product(req.body);
  try {
    await product.save();
  } catch (error) {
    return res.status(500).json("Unknown error occured!");
  }
 
  winston.info("porduct created");
  res.json({ message: "product has been created" });
});


productRouter.get("/products", async (req, res) => {
  try {
    if (req.query.category) {
      // if category is specified in the query, then get all products of that category
      const products = await Product.find({
        category: req.query.category,
      });
      return res.json(products);
    } else if (req.query.search) {
      // if search is specified in the query, then get all products that match the search
      const products = await Product.find({
        name: { $regex: req.query.search, $options: "i" },
      });
      return res.json(products);
    } else {
      // if no query is specified, then get all products
      const products = await Product.find();
      return res.json(products);
    }
  } catch (error) {
    winston.error(error);
    return res.status(500).json({
      error: "fetching products failed!",
    });
  }
});


productRouter.get("/products/:id", async (req, res) => {
  
  let product;
  try {
    product = await Product.findById(req.params.id);
  } catch (error) {
    return res.status(500).json("Unknown error occured!");
  }
  res.json(product);
});


productRouter.put("/products/:id", async (req, res) => {
 
  const { id } = req.params;

  try {
    await Product.findByIdAndUpdate(id, req.body);
  } catch (error) {
    return res.status(500).json("Unknown error occured!");
  }
  res.json({ message: "Product updated" });
});


productRouter.delete("/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndRemove(req.params.id);
  } catch (error) {
    return res.status(500).json("Unknown error occured!");
  }
  res.json({ message: "Product has been deleted" });
});

export default productRouter;