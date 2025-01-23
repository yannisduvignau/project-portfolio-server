import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedPassions() {
  const hobbies = [
    {
      title: 'Technologie',
      emojo: '',
      top: 0,
      left: 0,
    },
    {
      title: 'Informatique',
      emojo: '',
      top: 0,
      left: 0,
    },
    {
      title: 'Sport',
      emojo: '',
      top: 0,
      left: 0,
    },
    {
      title: 'Natation',
      emojo: '',
      top: 0,
      left: 0,
    },
    {
      title: 'Sauvetage',
      emojo: '',
      top: 0,
      left: 0,
    },
    {
      title: 'Voyager',
      emojo: '',
      top: 0,
      left: 0,
    },
    {
      title: 'Sortir',
      emoji: '',
      top: 0,
      left: 55,
    },
  ];

  for (const item of hobbies) {
    // Vérifie si un élément avec le même titre existe déjà
    const existingItem = await prisma.passion.findFirst({
      where: { titre: item.title },
    });

    // Si l'élément n'existe pas, il est créé
    if (!existingItem) {
      await prisma.passion.create({
        data: {
          emoji: item.emoji,
          titre: item.title,
          top: item.top,
          left: item.left,
        },
      });
    }
  }

  console.log('Seed data for Hobby created');
}
