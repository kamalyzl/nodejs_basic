import 'dotenv-flow/config';
import request from 'supertest';
import app from '../start/app';

describe('Token', () => {
  test('POST / 200', async () => {
    const response = await request(app)
      .post('/tokens')
      .set('Content-Type', 'application/json')
      .send({
        card_number: '4111111111111111',
        cvv: '123',
        expiration_month: '09',
        expiration_year: '2020',
        email: 'richard@piedpiper.com',
      });
    expect(response.statusCode).toBe(200);
  });
  test('POST / 404', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(404);
  });
});
