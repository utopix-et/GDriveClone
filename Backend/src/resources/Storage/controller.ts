import { Request } from "express";
import StorageService from "../../services/StorageService";
import busboy from 'busboy'
import { randomFillSync } from "node:crypto";
import { Connection } from "mongoose";

class StorageController {
    storageService;
    constructor() {
        this.storageService = new StorageService;
    }
   
    async upload(req: Request, res: Response) {
        const bb = busboy({ headers: req.headers });
        bb.on('file', (name, file, info) => {
            const { filename, encoding, mimeType } = info;
            this.storageService.upload(file, filename);
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
        return;
    }
}