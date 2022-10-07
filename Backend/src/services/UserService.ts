import UserRepository from "../Repository/UserRepository";
import { PrismaClient } from "@prisma/client";
import {Prisma} from "@prisma/client"
//Not yet implemented
export default class UserService {
    userRepository: UserRepository;
    constructor(prismaClient: PrismaClient<never, never>) {
        this.userRepository = new UserRepository(prismaClient);
    }
    async signup(user: Prisma.UserCreateInput) {
        const newUser = await this.userRepository.createUser(user);
        return newUser;
    }
    async Login(email: string, password: string) {
        const user = await this.userRepository.getUserByEmail(email);
        if (user.password === password) {
            return user;
        }
        return null;
    }
    async profile(id: string) {
        const user = await this.userRepository.getUser(id);
        return user;
    }
}