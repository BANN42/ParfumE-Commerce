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
    }).validate(objectBody);
}

// validation the user Claims at the Update
export let productValidationUpdating = function (objectBody) {
    return Joi.object({
    name : Joi.string().required(),
    brand : Joi.string().required(),
    description: Joi.string().required(),
    price : Joi.number().min(0).default(0),
    category : Joi.string().allow(['Male' , "Female", "Mixte"]),
    volume : Joi.number().required(),
    stock : Joi.number().required(),
    img : Joi.string().required(),
    }).validate(objectBody);
}


