import prisma from "../../prisma";

export default class UsersService {

    async fetchAll(skip: number, take: number) {

        const data = await prisma.user.findMany({ skip, take });

        const count = await prisma.user.count();

        return { data, count };
    }

    async fetchByQuery(query: string, limit: number) {
        return await prisma.user.findMany({
            where: {
                OR: [
                    { name: { contains: query } },
                    { city: { contains: query } },
                    { country: { contains: query } },
                    { favorite_sport: { contains: query } },
                ],
            },
            take: limit,
        });
    }
}