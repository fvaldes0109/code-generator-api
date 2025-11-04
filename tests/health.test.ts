import request from 'supertest';
import app from '../src/main';

describe('GET /api/health', () => {
  it('should return 200 and status OK', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'OK' });
  });
});
