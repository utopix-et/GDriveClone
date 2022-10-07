import { getStorage } from 'firebase-admin/storage';
import {Prisma} from '@prisma/client'
import FileRepository from '../Repository/FileRepository';
import { createWriteStream, ReadStream } from 'fs'
import path from 'path'
import File from '../resources/users/interface';
class StorageService {
    fileRepository;
    cloudStorage;
    constructor() {
        this.fileRepository = new FileRepository();
        this.cloudStorage = getStorage().bucket();
    }
    async upload(file: ReadStream, info: any) {
        const filePath = path.resolve(info.filename);
        const f = createWriteStream("", { encoding: info.encoding });
        file.pipe(f);
        this.cloudStorage.upload(filePath).then(data => {
            console.log('upload success', data);
        }).catch(err => {
            console.log('error uploading to storage', err);
        });
    }
}