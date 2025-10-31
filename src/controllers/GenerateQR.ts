import { Request, Response } from "express";
import QRCode from "qrcode";
import { QRRequestBody } from '../validators/QRValidator';

const generateQR = async (body: QRRequestBody, res: Response): Promise<void> => {
  try {
    const { payload, version, lightcolor, darkcolor } = body;

    const qrDataUrl = await QRCode.toDataURL(payload, {
      version: version || undefined,
      color: {
        light: lightcolor || "#FFFFFF",
        dark: darkcolor || "#000000",
      },
      errorCorrectionLevel: body.error || undefined,
      maskPattern: body.mask || undefined,
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
