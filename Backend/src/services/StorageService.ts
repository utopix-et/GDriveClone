import { getStorage } from 'firebase-admin/storage';
import {Prisma} from '@prisma/client'
import FileRepository from '../Repository/FileRepository';
import { createWriteStream, rm} from 'fs'
import path from 'path'
import { Readable } from 'stream';
import { randomFillSync } from 'node:crypto';
import * as os from 'node:os'
export default class StorageService {
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
    async upload(file: Readable, info: any) {
        const saveto = path.join(os.tmpdir(), `busboy-upload-${this.random()}`);
        const f = createWriteStream(saveto, { encoding: info.encoding });
        file.pipe(f);
        this.cloudStorage.upload(saveto).then(data => {
            console.log('upload success', data);
        }).catch(err => {
            console.log('error uploading to storage', err);
        });
        rm(saveto, (err) => {
            console.log(err);
        });
    }
}