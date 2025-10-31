import express from 'express';
import initRoutes from './routes/api';

const app = express();
const port = 3000;

app.use(express.json());

initRoutes(app);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
