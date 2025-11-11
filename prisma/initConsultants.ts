import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.consultantsLeftModel.deleteMany();
  await prisma.consultantsRightModel.deleteMany();

  await prisma.consultantsLeftModel.create({
    data: {
      id: 1,
      name: "Консультант 1",
      title: "Должность 1",
      photo: "left.jpg",
    },
  });

  await prisma.consultantsRightModel.create({
    data: {
      id: 1,
      name: "Консультант 2",
      title: "Должность 2",
      photo: "right.jpg",
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
