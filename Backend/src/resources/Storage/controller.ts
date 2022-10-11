import { Request, Response } from "express";
import busboy from 'busboy'
import { randomFillSync } from "node:crypto";
import { createWriteStream, rm ,stat} from "node:fs";
import path from "node:path";
import FileRepository from '../../Repository/FileRepository';
import {initializeApp, cert} from 'firebase-admin/app'
import { getStorage } from "firebase-admin/storage";
import * as serviceAccount from '../../config/serviceAccountKey.json'
import { Prisma } from '@prisma/client';
export default class StorageController {
    fileRepository;
    cloudStorage;
    constructor() {
        initializeApp(
            {
                credential: cert({
                    privateKey: serviceAccount.private_key,
                    clientEmail: serviceAccount.client_email,
                    projectId: serviceAccount.project_id,
                }),
                storageBucket: 'gs://gdriveclone-a48ba.appspot.com/',
            }
        );
        this.fileRepository = new FileRepository();
        this.cloudStorage = getStorage().bucket();
    }
    random() {
        const buf = Buffer.alloc(16);
        return () => randomFillSync(buf).toString('hex');
    }
   
    async upload(req: Request, res: Response) {
        const bb = busboy({ headers: req.headers });
        let saveto: string;
        let fileData: Prisma.FileCreateInput;
        bb.on('file', (name, file, info) => {
            const { filename, encoding, mimeType } = info;
            fileData.mimetype = mimeType;
            const ext = path.extname(filename);
            const basename = path.basename(filename);
            saveto = path.resolve(`${basename}-${this.random()}.${ext}`);
            const f = createWriteStream(saveto);
            file.pipe(f);
        });
        bb.on('field', (name, val, info) => {
            console.log(`Field [${name}]: value: %j`, val);
        });
        bb.on('finish', () => {
            this.cloudStorage.upload(saveto).then(data => {
                stat(saveto, (err,stats) => {
                    if (err) {
                        console.log(err);
                    }
                    fileData.size = stats.size;
                    fileData.filename = path.basename(saveto);
                })
                console.log(data);
            }).catch(err => {
                res.status(403).json({
                    message: "unable to upload to firebase"
                })
            });
            rm(saveto, (err) => {
                console.log(err);
            });
        })
        bb.on('close', () => {
            console.log('Done parsing form!');
            //res.writeHead("Connection", 'close');
            //res.headers.set("Location", '/');
        });
        req.pipe(bb);
    }
    //delete file and folder request handler
    // route /storage/delete/:id?type={file/folder}
    async delete(req: Request, res: Response) {
        console.log("Not yet implemented")
    }
    //createfolder request handler
    //route /storage/create
    async createFolder(req: Request, res: Response) {
        console.log("Not yet implemented")
    }
    //rename file and folder request handler
    //route /storage/rename/:id?type={file/folder}
    async rename(req: Request, res: Response) {
        console.log("Not yet implemented")
    }
    //retrieve all files and folder on given folder
    //route /storage/folder/:id
    async getContents(req: Request, res: Response) {
        console.log("Not yet implemented")
    }
    //moving file and folder one directory to another directory
    //route /storage/move data:{ from: fileID, to: folderId}
    async move(req: Request, res: Response) {
        console.log("Not yet implemented")
    }
    //moving to recycle bin deleted file (not priority)
    async moveToTrash(req: Request, res: Response) {
        console.log("Not yet implemented")
    }
}