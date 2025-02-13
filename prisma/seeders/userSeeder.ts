import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedUser() {
  const userItems = [
    {
      email: 'yannisduvignau@gmail.com',
      firstname: 'yannisduvignau',
      password: '$2b$10$UwM715IQAaEqL937aHEpN.P.ggMZ7f8OpGPQY5vq1kjoviWt9v0d2', // abc123
    },
    {
      email: 'emma.capdet40600@gmail.com',
      firstname: 'emmacapdet',
      password: '$2b$10$UwM715IQAaEqL937aHEpN.P.ggMZ7f8OpGPQY5vq1kjoviWt9v0d2', // abc123
    },
  ];

  try {
    for (const item of userItems) {
      await prisma.user.upsert({
        where: { email: item.email },
        update: {
          email: item.email,
          firstname: item.firstname,
          password: item.password,
        },
        create: {
          email: item.email,
          firstname: item.firstname,
          password: item.password,
        },
      });
    }

    console.log('✅ Seed data for User created/updated successfully');
  } catch (error) {
    console.error('Error seeding User:', error);
  } finally {
    await prisma.$disconnect();
  }
}
