import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import storageRoutes from './resources/Storage/routes'
dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;
app.use(cors())
app.use(express.json());
app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});
app.use('/storage', storageRoutes);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});