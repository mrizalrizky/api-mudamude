const Joi = require("joi");
const jsonMessage = require("../jsonFormat/jsonMessage");
const { BAD_REQUEST } = require("../constants/httpStatusCodes");

exports.login = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(16),
  }).unknown(true);

  const { error } = schema.validate(req.body);

  if (error) {
    return res
      .status(BAD_REQUEST)
      .send(jsonMessage.jsonFailed("MUDAMUDE-400", error.message));
  }

  next();
};

exports.register = (req, res, next) => {
  const schema = Joi.object({
    full_name: Joi.string().min(3),
    username: Joi.string().alphanum().min(3).max(30),
    email: Joi.string().email(),
    password: Joi.string().pattern(new RegExp("^[a-z0-9]{3,30}$")),
    repeat_password: Joi.ref("password"),
  }).unknown(true);

  const { error } = schema.validate(req.body);

  if (error) {
    return res
      .status(BAD_REQUEST)
      .send(jsonMessage.jsonFailed("MUDAMUDE-400", error.message));
  }

  next();
};
