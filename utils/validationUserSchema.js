import Joi from "joi";
// ======================================================= PROFILE SCHEMA MUST BE AT REGISTRATION =======================================================
const userSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(12).required(),
  birthday: Joi.date()
    .custom(function (value, helper) {
      let givenDate = Number(new Date(value));
      let currentDate = Date.now();
      let actuallyAge = currentDate - givenDate;
      let TheAge = actuallyAge / (1000 * 60 * 60 * 24 * 365);
      if (TheAge < 18) {
        return helper.message("The Must Be Greater Than 18 Years Old");
      }
      return value;
    })
    .required(), // need to be greater than 18yo,
  phone: Joi.string()
    .regex(/^(?:0[67]\d{8}|\+212[67]\d{8})$/)
    .required()
    .messages({
      "string.pattern.base":
        "Please enter a valid Moroccan phone number (e.g. 0600000000 or +212600000000).",
    }),
  isVerified: Joi.boolean().default(false),
  gender: Joi.string().valid("Male", "Female").required(),
  img: Joi.string(),
});

export const userSchemaValidator = (userSchema) => {
  return function (payload) {
    return userSchema.validate(payload, {
      abortEarly: false,
    });
  };
};

export const userRegisterValidator = userSchemaValidator(userSchema);

// ========================================================================= UPDATE USER PROFILE CREDENTIALS ================================================
const updateProfileSchema = Joi.object({
  username: Joi.string().min(3),
  birthday: Joi.date().custom(function (value, helper) {
    const age =
      (Date.now() - new Date(value).getTime()) / (1000 * 60 * 60 * 24 * 365);

    if (age < 18) {
      return helper.message("You must be at least 18 years old.");
    }
    return value;
  }),
  phone: Joi.string()
    .regex(/^(?:0[67]\d{8}|\+212[67]\d{8})$/)
    .messages({
      "string.pattern.base":
        "Please enter a valid Moroccan phone number (e.g. 0600000000 or +212600000000).",
    }),
  gender: Joi.string().valid("Male", "Female"),
})
  .min(1)
  .unknown(false);

export const validateUpdateProfileSchema = (userSchema) => {
  return function (payload) {
    return userSchema.validate(payload, {
      abortEarly: false,
    });
  };
};

export const validateUpdateProfile =
  validateUpdateProfileSchema(updateProfileSchema);

// ============================================================== UPDATE USER PASSWORD ===========================================================
const passwordValide = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().min(12).required(),
  confirmPassword: Joi.string()
    .valid(Joi.ref("newPassword"))
    .required()
    .messages({
      "any.only": "The passwords do not match.",
    }),
}).unknown(false);

const validationPasswordUpdate = function (valideSchemaUpdate) {
  return function (payload) {
    return valideSchemaUpdate.validate(payload, {
      abortEarly: false,
    });
  };
};

export const validateChangePassword = validationPasswordUpdate(passwordValide);
