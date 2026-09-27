import Joi from "joi";


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

// validation the user Claims at the Update
export let productValidationUpdating = function (objectBody) {
    return Joi.object({
    name : Joi.string(),
    brand : Joi.string(),
    description: Joi.string(),
    price : Joi.number().min(0).default(0),
    category : Joi.string().valid('Male' , "Female", "Mixte"),
    volume : Joi.number(),
    stock : Joi.number(),
    img : Joi.string(),
    }).validate(objectBody , {
        abortEarly : false,
    });
}


export let productValidationCreateMultipleImages = function(objectBody){
    return Joi.object({
      name: Joi.string().required(),
      brand: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().min(0).default(0).required(),
      category: Joi.string().valid("Male", "Female", "Mixte").required(),
      volume: Joi.number().required(),
      stock: Joi.number().required(),
      imgs: Joi.array().items(Joi.string()).required(), // this is might an array or a single item
    }).validate(objectBody, {
      abortEarly: false,
    });
}


