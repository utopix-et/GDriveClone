import { Request } from "express";
import busboy from 'busboy'
import { randomFillSync } from "node:crypto";
import { Connection } from "mongoose";
import { createWriteStream, rm } from "node:fs";
import path from "node:path";
import * as os from "os";
import FileRepository from '../../Repository/FileRepository';
import { getStorage } from "firebase-admin/storage";

class StorageController {
    fileRepository;
    cloudStorage;
    constructor() {
        this.fileRepository = new FileRepository();
        this.cloudStorage = getStorage().bucket();
    }
    random() {
        const buf = Buffer.alloc(16);
        return () => randomFillSync(buf).toString('hex');
    }
   
    async upload(req: Request, res: Response) {
        const bb = busboy({ headers: req.headers });
        const saveto = path.join(os.tmpdir(), `busboy-upload-${this.random()}`);
        bb.on('file', (name, file, info) => {
            const { filename, encoding, mimeType } = info;
            const f = createWriteStream(saveto);
            file.pipe(f);
        });
        bb.on('field', (name, val, info) => {
            console.log(`Field [${name}]: value: %j`, val);
        });
        bb.on('close', () => {
            console.log('Done parsing form!');
            res.headers.set("Connection", 'close');
            res.headers.set("Location", '/');
        });
        req.pipe(bb);
        this.cloudStorage.upload(saveto).then(data => {
            console.log('upload success', data);
        }).catch(err => {
            console.log('error uploading to storage', err);
        });
        rm(saveto, (err) => {
            console.log(err);
        });
        return;
    }
}