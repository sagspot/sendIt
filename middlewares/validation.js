const Joi = require('joi');

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return schema.validate(data);
};

const sendParcelValidation = (data) => {
  const schema = Joi.object({
    item: Joi.string().min(3).required(),
    toUser: Joi.string().email().required(),
  });

  return schema.validate(data);
};

const receiveParcelValidation = (data) => {
  const schema = Joi.object({
    isDelivered: Joi.boolean().required(),
    remarks: Joi.string(),
  });

  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.sendParcelValidation = sendParcelValidation;
module.exports.receiveParcelValidation = receiveParcelValidation;
