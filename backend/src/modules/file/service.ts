import { UserInterface } from "../../datatypes/interfaces";
import prisma from "../../prisma";

export default class FileService {

    async createMany(users: UserInterface[]) {

        users.forEach(async (element) => {
            await prisma.user.create({ data: element });
        });
        
        return;

    }
}