import request from 'supertest';
import app from '../src/main';

describe('POST /api/generate/barcode', () => {
  it('should return base64Barcode on valid payload', async () => {
    const response = await request(app)
      .post('/api/generate/barcode')
      .send({ payload: '1234567890' })
      .expect(200);

    expect(response.body).toHaveProperty('base64Barcode');
    const base64: string = response.body.base64Barcode;
    expect(typeof base64).toBe('string');
    expect(base64.startsWith('data:image')).toBe(true);
  });
});
