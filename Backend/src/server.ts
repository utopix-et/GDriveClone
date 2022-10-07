import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { initializeApp, cert } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import serviceAccount from './config/serviceAccountKey.json';
import { dirname } from 'path';
dotenv.config();

const firebaseApp = initializeApp(
    {
        credential: cert({
            privateKey: serviceAccount.private_key,
            clientEmail: serviceAccount.client_email,
            projectId: serviceAccount.project_id,
        }),
        storageBucket: 'gs://gdriveclone-a48ba.appspot.com/',
    }
);
const bucket = getStorage().bucket();
const dir =
//upload file to cloud storage
    bucket.upload('/home/yidye/GDriveClone/Backend/src/Repository/FileRepository.ts', {
        destination: 'ia'
    }).then(data => {
    console.log('upload success', data);
}).catch(err => {
    console.log('error uploading to storage', err);
});
const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json);
app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});