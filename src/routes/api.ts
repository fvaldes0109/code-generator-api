import { Express, Request, Response } from "express";
import { generateQR } from "../controllers/GenerateQR";

const initRoutes = (app: Express) => {

  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'OK' });
  });

  app.post('/api/generate/qr', generateQR);
};

export default initRoutes;
