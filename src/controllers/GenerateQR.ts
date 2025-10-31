import { Request, Response } from "express";
import QRCode from "qrcode";

export const generateQR = async (req: Request, res: Response): Promise<void> => {
  try {
    const { payload, version, lightcolor, darkcolor } = req.body;

    if (version && (version < 1 || version > 40 || !Number.isInteger(version))) {
        res.status(400).json({ error: "'version' must be an integer between 1 and 40" });
        return;
    }

    if (!payload) {
      res.status(400).json({ error: "Missing 'payload' in request body" });
      return;
    }

    const qrDataUrl = await QRCode.toDataURL(payload, {
      version: version || undefined,
        color: {
            light: lightcolor || "#FFFFFF",
            dark: darkcolor || "#000000",
        },
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
