import Joi from "joi";

let loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(12).required(),
});

const loginSchemaValidator = (loginSchema) => {
  return function (payload) {
    return loginSchema.validate(payload, {
      abortEarly: false,
    });
  };
};

let verifylogin = loginSchemaValidator(loginSchema);

export function validationLogin(req, res, next) {
  try {
    let { email, password } = req.body;
    let { error } = verifylogin({ email, password });
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
