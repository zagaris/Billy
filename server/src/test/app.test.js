/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
const request = require('supertest');
const { expect } = require('chai');

const app = require('../app');
const db = require('../database/connection');

const urls = db.get('urls');

const newUrl = {
  url: 'https://google.com',
  name: 'test',
};

describe('GET /', () => {
  it('should respond with a message', async () => {
    await request(app)
      .get('/')
      .expect(200);
  });
});

describe('POST /api/billy/', () => {
  before(async () => {
    await urls.remove({});
  });

  it('should require a name', async () => {
    const response = await request(app)
      .post('/api/billy/')
      .send({ url: 'https://example.com' })
      .expect(500);
    expect(response.body.details[0].message).to.equal('"name" is required');
  });

  it('should require a url', async () => {
    const response = await request(app)
      .post('/api/billy/')
      .send({ name: 'test' })
      .expect(500);
    expect(response.body.details[0].message).to.equal('"name" missing required peer "url"');
  });
  it('should create a new url', async () => {
    const response = await request(app)
      .post('/api/billy')
      .send(newUrl)
      .expect(201);
    expect(response.body).to.have.property('_id');
  });
  it('should not allow a user with an existing username', async () => {
    const response = await request(app)
      .post('/api/billy')
      .send(newUrl)
      .expect(500);
    expect(response.body.details[0].message).to.equal('Name is in use');
  });
});
