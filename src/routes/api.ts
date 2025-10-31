import { Express, Request, Response } from "express";
import generateQR from "../controllers/GenerateQR";
import validateQRRequest from "../validators/QRValidator";

const initRoutes = (app: Express) => {

  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'OK' });
  });

  app.post('/api/generate/qr', (req: Request, res: Response) => {
    const validation = validateQRRequest(req, res);
    if (!validation.success) {
      return res.status(400).json({ error: validation.error });
    }
    generateQR(validation.data, res);
  });
};

export default initRoutes;
