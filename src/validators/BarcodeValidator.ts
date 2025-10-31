import { Request, Response } from "express";
import { Result } from "../utils/types";

const barcodeFormats = [ 'CODE128', 'CODE39', 'MSI', 'codabar' ] as const;

type barcodeFormatType = typeof barcodeFormats[number];

export type BarcodeRequestBody = {
  payload: string,
  displayValue?: boolean,
  format?: barcodeFormatType,
}

const validateBarcodeRequest = (req: Request, res: Response): Result<BarcodeRequestBody, string> => {
    
  const {
    payload,
    displayValue,
    format,
  } = req.body;

  if (format !== undefined && !barcodeFormats.includes(format)) {
    return {
      success: false,
      error: `'format' must be one of ${barcodeFormats.join(', ')}`
    }
  }

  return {
    success: true,
    data: { payload, displayValue, format }
  }
}

export default validateBarcodeRequest;