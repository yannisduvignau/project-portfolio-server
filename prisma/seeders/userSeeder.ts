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

  for (const user of userItems) {
    // Vérifie si un utilisateur avec le même email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    // Si l'utilisateur n'existe pas, il est créé
    if (!existingUser) {
      await prisma.user.create({
        data: {
          email: user.email,
          firstname: user.firstname,
          password: user.password,
        },
      });
    }
  }

  console.log('Seed data for User created');
}
