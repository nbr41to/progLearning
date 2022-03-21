const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const message = "Hello, World!";
console.log(message);

const load = async () => {
  try {
    await prisma.user.deleteMany();
    console.log("Deleted records in category table");

    await prisma.$queryRaw`ALTER TABLE User AUTO_INCREMENT = 1`;
    console.log("reset product auto increment to 1");

    await prisma.user.createMany({
      data: {
        email: "nbr.41to@gmail.com",
        userId: "String",
        lastLogin: new Date(),
        profileId: 1,
        statusId: 1,
      },
    });
    console.log("Added user data");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
