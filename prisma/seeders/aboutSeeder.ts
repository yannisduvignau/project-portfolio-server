import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedAbout() {
  const aboutItems = [
    {
      label: "Années d'expérience",
      label_en: 'Years of experience',
      slug: 'experience_years',
      number: 7,
      priority: 3,
      masqued: false,
    },
    {
      label: 'Clients',
      label_en: 'Customers',
      slug: 'customers',
      number: 1,
      priority: 1,
      masqued: false,
    },
    {
      label: 'Projets',
      label_en: 'Projects',
      slug: 'projects',
      number: 10,
      priority: 2,
      masqued: false,
    },
  ];

  try {
    for (const item of aboutItems) {
      await prisma.about.upsert({
        where: { slug: item.slug },
        update: {
          label: item.label,
          label_en: item.label_en,
          number: item.number,
          priority: item.priority,
          masqued: item.masqued,
        },
        create: {
          label: item.label,
          label_en: item.label_en,
          number: item.number,
          priority: item.priority,
          slug: item.slug,
          masqued: item.masqued,
        },
      });
    }

    console.log('✅ Seed data for About created/updated successfully');
  } catch (error) {
    console.error('Error seeding About:', error);
  } finally {
    await prisma.$disconnect();
  }
}
