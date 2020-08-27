const Joi = require('@hapi/joi');

const schema = Joi.object({
  name: Joi.string().alphanum().min(2).max(20)
    .required(),

  url: Joi.string().uri({
    scheme: [/https?/],
  }),
}).with('name', 'url');

module.exports = schema;
