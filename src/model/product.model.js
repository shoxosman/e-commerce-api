import mongoose from "mongoose";


const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: String,
  description:String,
  image:String,
  price: {
    type: Number,
    default: 0,
  },

  delivary:String,
});

const Product = mongoose.model("Product", ProductSchema);


export default Product;