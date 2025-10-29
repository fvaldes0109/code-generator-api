import { Express, Request, Response } from "express";

const initRoutes = (app: Express) => {

  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'OK' });
  });

  
};

export default initRoutes;
