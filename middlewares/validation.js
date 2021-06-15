const Joi = require('joi');

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
  });

  return schema.validate(data);
};

const sendParcel = (data) => {
  const schema = Joi.object({
    item: Joi.string().min(3).required(),
    toUser: Joi.string().email().required(),
  });

  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.sendParcel = sendParcel;
