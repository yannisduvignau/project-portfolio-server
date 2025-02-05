import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedNavigation() {
  const navItems = [
    {
      label: 'Accueil',
      link: 'hero',
      className: 'nav-link',
      priority: 1,
      masqued: false,
    },
    {
      label: 'Projects',
      link: 'projects',
      className: 'nav-link',
      priority: 2,
      masqued: false,
    },
    {
      label: 'Compétences',
      link: 'skills',
      className: 'nav-link',
      priority: 3,
      masqued: false,
    },
    {
      label: 'Expériences',
      link: 'experience',
      className: 'nav-link',
      priority: 4,
      masqued: false,
    },
    {
      label: 'Cybersécurité',
      link: 'cyber',
      className: 'nav-link',
      priority: 5,
      masqued: false,
    },
    {
      label: 'Contact',
      link: 'contact',
      className: 'nav-link md:hidden',
      priority: 6,
      masqued: false,
    },
  ];

  for (const item of navItems) {
    // Vérifie si un élément avec le même titre existe déjà
    const existingItem = await prisma.navigation.findFirst({
      where: { label: item.label },
    });

    // Si l'élément n'existe pas, il est créé
    if (!existingItem) {
      await prisma.navigation.create({
        data: {
          label: item.label,
          link: item.link,
          className: item.className,
          priority: item.priority,
          masqued: item.masqued,
        },
      });
    }
  }

  console.log('Seed data for Navigation items created');
}
