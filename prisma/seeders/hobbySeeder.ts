import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedHobby() {
  const hobbies = [
    {
      title: 'Technologies',
      emoji: '💻',
      top: 23,
      left: 0,
      masqued: false,
    },
    {
      title: 'Informatique',
      emoji: '📟',
      top: 60,
      left: 10,
      masqued: false,
    },
    {
      title: 'Sports',
      emoji: '🏃🏽',
      top: 10,
      left: 80,
      masqued: false,
    },
    {
      title: 'Natation',
      emoji: '🏊🏽‍♂️',
      top: 9,
      left: 40,
      masqued: false,
    },
    {
      title: 'Sauvetage',
      emoji: '🛟',
      top: 85,
      left: 40,
      masqued: false,
    },
    {
      title: 'Voyager',
      emoji: '🛫',
      top: 70,
      left: 75,
      masqued: false,
    },
    {
      title: 'Sortir',
      emoji: '🍻',
      top: 44,
      left: 55,
      masqued: false,
    },
    {
      title: 'Musculation',
      emoji: '🏋🏽‍♂️',
      top: 80,
      left: 5,
      masqued: false,
    },
    {
      title: 'Sciences',
      emoji: '🧪',
      top: 35,
      left: 25,
      masqued: false,
    },
    {
      title: 'Lire',
      emoji: '📚',
      top: 85,
      left: 70,
      masqued: false,
    },
    {
      title: 'Musique',
      emoji: '🎶',
      top: 65,
      left: 52,
      masqued: false,
    },

    {
      title: 'Echecs',
      emoji: '♟️',
      top: 30,
      left: 60,
      masqued: false,
    },
  ];

  for (const item of hobbies) {
    // Vérifie si un élément avec le même title existe déjà
    const existingItem = await prisma.hobby.findFirst({
      where: { title: item.title },
    });

    // Si l'élément n'existe pas, il est créé
    if (!existingItem) {
      await prisma.hobby.create({
        data: {
          emoji: item.emoji,
          title: item.title,
          top: item.top,
          left: item.left,
          masqued: item.masqued,
        },
      });
    }
  }

  console.log('Seed data for Hobby created');
}
