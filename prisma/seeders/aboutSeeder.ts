import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedAbout() {
  const aboutItems = [
    { label: "Années d'expériences", number: 7, priority: 3, masqued: false },
    { label: 'Clients', number: 1, priority: 1, masqued: false },
    { label: 'Projets', number: 10, priority: 2, masqued: false },
  ];

  for (const item of aboutItems) {
    // Vérifie si un élément avec le même label existe déjà
    const existingItem = await prisma.about.findFirst({
      where: { label: item.label },
    });

    // Si l'élément n'existe pas, il est créé
    if (!existingItem) {
      await prisma.about.create({
        data: {
          label: item.label,
          number: item.number,
          priority: item.priority,
          masqued: item.masqued,
        },
      });
    }
  }

  console.log('Seed data for About created');
}
