import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client"

export default class UserRepository {
    prismaClient: PrismaClient<never, never>;
    constructor(prismaClient: PrismaClient<never, never>) {
        this.prismaClient = prismaClient;
    }
    async getUser(id: string) {
        const user = await this.prismaClient.user.findUnique({
            where: {
                id
            }
        });
        return user;
    }
    async getUserByEmail(email: string) {
        const user = await this.prismaClient.user.findUnique({
            where: {
                email
            }
        });
        return user;
    }
    async createUser(user: Prisma.UserCreateInput) {
        const newUser = await this.prismaClient.user.create({
            data: user
        });
        return newUser;
    }
    async updateUser(user: Prisma.UserUpdateInput, id: string) {
        const updatedUser = await this.prismaClient.user.update({
            where: {
                id
            },
            data: user
        });
        return updatedUser;
    }
    async deleteUser(id: string) {
        const deletedUser = await this.prismaClient.user.delete({
            where: {
                id
            }
        });
        return deletedUser;
    }
}