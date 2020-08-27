/* eslint-disable prefer-promise-reject-errors */
const db = require('./connection');

const urls = db.get('urls');

const schema = require('./schema');

function find(name) {
  return urls.findOne({
    name,
  });
}

async function create(originalUrl) {
  const result = schema.validate({
    name: originalUrl.name,
    url: originalUrl.url,
  });

  if (result.error === undefined) {
    const url = await urls.findOne({
      name: originalUrl.name,
    });
    if (!url) {
      return urls.insert(originalUrl);
    }
    return Promise.reject({
      isJoi: true,
      details: [
        {
          message: 'Name is in use',
        },
      ],
    });
  }
  return Promise.reject({
    wrong: true,
    details: [
      {
        message: result.error.details[0].message,
      },
    ],
  });
}

module.exports = {
  create,
  find,
};
