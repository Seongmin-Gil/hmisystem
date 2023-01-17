const joi = require('joi');
const CustomError = require('../../util/customError');

const signUpSchema = joi
  .object({
    body: joi.object({
      id: joi.string().required().error(new CustomError(400, 'INVALID_ID')),
      password: joi
        .string()
        .min(6)
        .max(20)
        .required()
        .error(new CustomError(400, 'INVALID_PASSWORD')),
      name: joi.string().required().error(new CustomError(400, 'INVALID_NAME')),
      type: joi.string().required(),
    }),
  })
  .unknown(true);

const loginSchema = joi
  .object({
    body: joi.object({
      id: joi.string().required().error(new CustomError(400, 'INVALID_ID')),
      password: joi
        .string()
        .min(6)
        .max(20)
        .required()
        .error(new CustomError(400, 'INVAILD_PASSWORD')),
    }),
  })
  .unknown(true);

module.exports = {
  signUpSchema,
  loginSchema,
};
