import Joi from "joi";
const categoryValidate = Joi.object({
    name: Joi.string().min(3).max(25).required(),
  });
  
  export default categoryValidate;
  