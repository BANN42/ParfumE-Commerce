import Joi from "joi";
import {  productValidationCreateMultipleImages } from "../../utils/ProductValidation.js";



// validation Production claims at the creation
export let productValidation = function(objectBody) {
    return Joi.object({
    name : Joi.string().required(),
    brand : Joi.string().required(),
    description: Joi.string().required(),
    price : Joi.number().min(0).default(0),
    category : Joi.string().valid('Male', 'Female', 'Mixte'),
    volume : Joi.number().required(),
    stock : Joi.number().required(),
    img : Joi.string().required(),
    }).validate(objectBody , {
        abortEarly : false
    });
}




export function productValidationMiddleware(req, res, next) {
    try{
        let {error} = productValidation(req.body);
        if(!error){
            next()
        }else{
            return res.status(400).json({error : error.message});
        }
    }catch(error) {
            return res.status(500).json({error : error.message})
    }
}


export function validationProductMultipleImages(req, res, next) {
  try {
    let { error } = productValidationCreateMultipleImages(req.body);
    if (!error) {
      next();
    } else {
      return res.status(400).json({ error: error.message });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

