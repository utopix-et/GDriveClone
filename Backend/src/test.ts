import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user: Prisma.UserCreateInput =

  // Check if posts should be included in the query
 {
        name: "yidnekachew",
        email: "password@gmail.com",
        password: "dfsfdrsrsf",
    }

  // Pass 'user' object into query
    const createUser = await prisma.user.findMany()
    console.log(createUser);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })