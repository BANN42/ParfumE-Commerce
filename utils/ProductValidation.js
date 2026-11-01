import Joi from "joi";

// validation the user Claims at the Update
export let productValidationUpdating = function (objectBody) {
  return Joi.object({
    name: Joi.string(),
    brand: Joi.string(),
    description: Joi.string(),
    price: Joi.number().min(0).default(0),
    category: Joi.string().valid("Male", "Female", "Mixte"),
    volume: Joi.number(),
    stock: Joi.number(),
    imgs: Joi.array().items(Joi.string()),
  }).validate(objectBody, {
    abortEarly: false,
  });
};

export let productValidationCreateMultipleImages = function (objectBody) {
  return Joi.object({
    name: Joi.string().trim().required(),
    brand: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
    price: Joi.number().min(0).required(),
    category: Joi.string().valid("Male", "Female", "Mixte").required(),
    volume: Joi.number().positive().required(),
    stock: Joi.number().integer().min(0).required(),
  }).validate(objectBody, {
    abortEarly: false,
  });
};
