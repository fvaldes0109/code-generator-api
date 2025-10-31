import { Response } from 'express';
import { BarcodeRequestBody } from '../validators/BarcodeValidator';
import { createCanvas } from 'canvas';
import JSBarcode from 'jsbarcode';


const generateBarcode = async (body: BarcodeRequestBody, res: Response): Promise<void> => {

  try {
    const {
      payload,
      displayValue,
      format,
    } = body;

    const canvas = createCanvas(300, 200);

    JSBarcode(canvas, payload, {
      displayValue: displayValue || undefined,
      format: format || undefined,
    });

    res.json({
      base64Barcode: canvas.toDataURL(),
    })
  } catch (error) {
    console.error("Error generating barcode:", error);
    res.status(500).json({
      error: `Failed to generate barcode: ${error}`,
    });
  }
}

export default generateBarcode;