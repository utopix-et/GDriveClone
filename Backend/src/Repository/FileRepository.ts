import { Prisma, PrismaClient } from "@prisma/client";
import File from '../resources/users/interface';

export default class FileRepository{
    prismaClient: PrismaClient<never, never>;
    constructor() {
        this.prismaClient = new PrismaClient();
    }
    async saveFile(file: Prisma.FileCreateInput) {
        try {
            await this.prismaClient.file.create({
                data: file
            })
        } catch (err) {
            console.log(err);
        }
    }
    async deleteFile(id: string) {
        try {
            await this.prismaClient.file.delete({
                where: { id}
            })
        } catch (err) {
            console.log("error");
        }
    }
    async createFolder(name: string, parentFolderId: string, userId: string) {
        const folder = await this.prismaClient.folder.create({
            data: {
                name,
                parentFolderId,
                ownerId: userId,
                size: 0,
            }
        });
        return folder;
    }
    async deleteFolder(id: string) {
        //delete folder
        //delete all files in folder
        //delete all subfolders in folder

    }
    async renameFolder(newName: string, folderId: string) {
        const folder = await this.prismaClient.folder.update({
            where: {
                id: folderId
            },
            data: {
                name: newName
            }
        });
        return folder;
    }
    async getContent(folderId: string) {
        const folders = await this.prismaClient.folder.findMany({
            where: {
                parentFolderId: folderId
            }
        });
        const files = await this.prismaClient.file.findMany({
            where: {
                parentFolderId: folderId
            }
        });
        return Promise.all([folders, files]);
    }
    async getFolder(folderId: string) {
        const folder = await this.prismaClient.folder.findUnique({
            where: {
                id: folderId
            }
        });
        return folder;
    }
}