import { Request, Response } from "express";
import { Result } from "../utils/types";

const qrVersions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40] as const;
type qrVersionType = typeof qrVersions[number];

const errorCorrections = ["L", "M", "Q", "H"] as const;
type qrErrorCorrectionType = typeof errorCorrections[number];

const qrMasks = [0, 1, 2, 3, 4, 5, 6, 7] as const;
type qrMaskType = typeof qrMasks[number];

export type QRRequestBody = {
  payload: string;
  version?: qrVersionType;
  error?: qrErrorCorrectionType;
  mask?: qrMaskType;
};

const validateQRRequest = (
  req: Request,
  res: Response
): Result<QRRequestBody, string> => {
  const { payload, version, error, mask } = req.body;

  if (!payload) {
    return { success: false, error: "Missing 'payload' in request body" };
  }

  if (
    version !== undefined &&
    (!Number.isInteger(version) || version < 1 || version > 40)
  ) {
    return {
      success: false,
      error: "'version' must be an integer between 1 and 40",
    };
  }

  if (error !== undefined && !errorCorrections.includes(error)) {
    return {
      success: false,
      error: `'error' must be one of ${errorCorrections.join(', ')}`,
    };
  }

  if (mask !== undefined && (!Number.isInteger(mask) || mask < 0 || mask > 7)) {
    return {
      success: false,
      error: "'mask' must be an integer between 0 and 7",
    };
  }

  return {
    success: true,
    data: { payload, version, error, mask },
  };
};

export default validateQRRequest;
