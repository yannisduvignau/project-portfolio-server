import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedHobby() {
  const hobbies = [
    {
      title: 'Technologies',
      title_en: 'Technology',
      emoji: '💻',
      top: 23,
      left: 0,
      masqued: false,
      slug: 'technology',
    },
    {
      title: 'Informatique',
      title_en: 'Computer Science',
      emoji: '📟',
      top: 60,
      left: 10,
      masqued: false,
      slug: 'computer_science',
    },
    {
      title: 'Sports',
      title_en: 'Sports',
      emoji: '🏃🏽',
      top: 10,
      left: 80,
      masqued: false,
      slug: 'sports',
    },
    {
      title: 'Natation',
      title_en: 'Swimming',
      emoji: '🏊🏽‍♂️',
      top: 9,
      left: 40,
      masqued: false,
      slug: 'swimming',
    },
    {
      title: 'Sauvetage',
      title_en: 'Lifesaving',
      emoji: '🛟',
      top: 85,
      left: 40,
      masqued: false,
      slug: 'lifesaving',
    },
    {
      title: 'Voyager',
      title_en: 'Travel',
      emoji: '🛫',
      top: 70,
      left: 75,
      masqued: false,
      slug: 'travel',
    },
    {
      title: 'Sortir',
      title_en: 'Going out for a drink',
      emoji: '🍻',
      top: 44,
      left: 55,
      masqued: false,
      slug: 'going_out_drinking',
    },
    {
      title: 'Musculation',
      title_en: 'Weight training',
      emoji: '🏋🏽‍♂️',
      top: 80,
      left: 5,
      masqued: false,
      slug: 'weight_training',
    },
    {
      title: 'Sciences',
      title_en: 'Sciences',
      emoji: '🧪',
      top: 35,
      left: 25,
      masqued: false,
      slug: 'sciences',
    },
    {
      title: 'Lire',
      title_en: 'Read books',
      emoji: '📚',
      top: 85,
      left: 70,
      masqued: false,
      slug: 'read',
    },
    {
      title: 'Musique',
      title_en: 'Music',
      emoji: '🎶',
      top: 65,
      left: 52,
      masqued: false,
      slug: 'music',
    },

    {
      title: 'Echecs',
      title_en: 'Chess',
      emoji: '♟️',
      top: 30,
      left: 60,
      masqued: false,
      slug: 'chess',
    },
  ];

  try {
    for (const item of hobbies) {
      await prisma.hobby.upsert({
        where: { slug: item.slug },
        update: {
          emoji: item.emoji,
          title: item.title,
          title_en: item.title_en,
          top: item.top,
          left: item.left,
          masqued: item.masqued,
          slug: item.slug,
        },
        create: {
          emoji: item.emoji,
          title: item.title,
          title_en: item.title_en,
          top: item.top,
          left: item.left,
          masqued: item.masqued,
          slug: item.slug,
        },
      });
    }

    console.log('✅ Seed data for Hobby created/updated successfully');
  } catch (error) {
    console.error('Error seeding Hobby:', error);
  } finally {
    await prisma.$disconnect();
  }
}
