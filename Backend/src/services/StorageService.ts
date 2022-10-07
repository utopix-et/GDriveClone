import { getStorage } from 'firebase-admin/storage';
import FileRepository from '../Repository/FileRepository';
import {createWriteStream, path} from 'fs'
import File from '../resources/users/interface';
class StorageService {
    fileRepository;
    cloudStorage;
    constructor() {
        this.fileRepository = new FileRepository();
        this.cloudStorage = getStorage().bucket;
    }
    async upload(file: ReadableStream, info: any) {
        const 
    }
}