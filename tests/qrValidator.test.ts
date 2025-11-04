import validateQRRequest from '../src/validators/QRValidator';
import { Request, Response } from 'express';

const mkReq = (body: any): Request => ({ body } as unknown as Request);
const mkRes = (): Response => ({} as unknown as Response);

describe('validateQRRequest', () => {
  it('should fail when payload is missing', () => {
    const result = validateQRRequest(mkReq({}), mkRes());
    expect(result).toEqual({ success: false, error: "Missing 'payload' in request body" });
  });

  it('should fail for invalid version', () => {
    const result = validateQRRequest(mkReq({ payload: 'abc', version: 41 }), mkRes());
    expect(result).toMatchObject({ success: false, error: "'version' must be an integer between 1 and 40" });
  });

  it('should fail for invalid error correction code', () => {
    const result = validateQRRequest(mkReq({ payload: 'abc', error: 'Z' }), mkRes());
    expect(result).toMatchObject({ success: false, error: "'error' must be one of L, M, Q, H" });
  });

  it('should fail for invalid mask', () => {
    const result = validateQRRequest(mkReq({ payload: 'abc', mask: 10 }), mkRes());
    expect(result).toMatchObject({ success: false, error: "'mask' must be an integer between 0 and 7" });
  });

  it('should succeed with minimal valid input', () => {
    const payload = 'hello';
    const result = validateQRRequest(mkReq({ payload }), mkRes());
    expect(result).toEqual({ success: true, data: { payload, version: undefined, error: undefined, mask: undefined } });
  });

  it('should succeed with all valid fields', () => {
    const body = { payload: 'abc', version: 5, error: 'M', mask: 3 };
    const result = validateQRRequest(mkReq(body), mkRes());
    expect(result).toEqual({ success: true, data: body });
  });
});
