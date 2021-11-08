const request = require('supertest');
const app = require('../index.js');
const req = request(app);


describe('Message Endpoints', () => {

  it('POST /message should should correspond to conversation_id to respond_id', async () => {
    const res = await req.post('/message')
            .send({
              conversation_id: 'abcd123',
              message: 'Hello, I’m John',
            });

      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining('json'));
      expect(res.body).toHaveProperty('response')
      expect('abcd123').toEqual(res.body.response_id)
  });

  it('POST /message should have [hello,hi] respond', async () => {
    const res = await req.post('/message')
            .send({
              conversation_id: 'abcd123',
              message: 'Hello, I’m John',
            });

      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining('json'));
      expect(res.body).toHaveProperty('response')
      expect('Welcome to StationFive.').toEqual(res.body.response)
  });

  it('POST /message should have [Goodbye,bye] respond', async () => {
    const res = await req.post('/message')
            .send({
              conversation_id: 'abcd123',
              message: 'bye, I’m John',
            });

      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining('json'));
      expect(res.body).toHaveProperty('response')
      expect('Thank you, see you around.').toEqual(res.body.response)
  });

});