const Joi = require('joi');
const validate = Joi.validate;
const _ = require('lodash');

Joi.validate = (
  value,
  schema,
  options = {
    convert: true,
    noDefaults: true,
    abortEarly: false,
    allowUnknown: false,
  }
) => {
  const param = _.pick(value, Object.keys(schema));
  const { value: result, error } = validate(param, schema, options);
  if (error) throw error;
  return result;
};

module.exports = Joi;
