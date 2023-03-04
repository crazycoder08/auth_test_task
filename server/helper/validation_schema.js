const Joi = require("joi");

const authSchema = Joi.object({
  email: Joi.string().email().required().lowercase(),
  password: Joi.string().min(6).required(),
  first_name: Joi.string(),
  last_name: Joi.string(),
});

module.exports = { authSchema };
