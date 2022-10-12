import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import mongoose from 'mongoose'
import storageRoutes from './resources/Storage/routes'
import { PrismaClient } from '@prisma/client';
import * as Mongoose from 'mongoose';
const prisma = new PrismaClient();
dotenv.config();


const app: Express = express();
const port = process.env.PORT || 3000;
app.use(cors())
app.use(express.json());
app.get('/', async (req: Request, res: Response) => {
    const data = await prisma.user.create({
        data: {
            name: "yidnekachew",
            email: "yidnekachewtebeje@gmail.com",
            password: "yidyetome",
        }
    })
    res.json(data);
});
app.use('/storage', storageRoutes);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});