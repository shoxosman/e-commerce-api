import Joi from "joi";


const productValidate = Joi.object({
  name: Joi.string().min(3).max(25).required(),
  category: Joi.string().required(),
  description:Joi.string(),
  image:Joi.string(),
  price: Joi.number().required(),
  delivary:Joi.string(),
});

export default productValidate;
