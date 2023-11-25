import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { UserRoutes } from './app/modules/user/user.router';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  const a = 10;

  res.json({
    a,
  });
});

export default app;
