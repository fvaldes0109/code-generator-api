import { Response } from "express";
import QRCode from "qrcode";
import { QRRequestBody } from '../validators/QRValidator';

const generateQR = async (body: QRRequestBody, res: Response): Promise<void> => {
  try {
    const { payload, version, error, mask } = body;

    const qrDataUrl = await QRCode.toDataURL(payload, {
      version: version || undefined,
      errorCorrectionLevel: error || undefined,
      maskPattern: mask || undefined,
    });

    res.status(200).json({
      base64Qr: qrDataUrl,
    });
  } catch (error) {
    console.error("Error generating QR code:", error);
    res.status(500).json({
      error: `Failed to generate QR code: ${error}`,
    });
  }
};

export default generateQR;
