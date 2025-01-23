import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedNavigation() {
  const navItems = [
    { label: 'Accueil', link: 'hero', className: 'nav-link' },
    { label: 'Projects', link: 'projects', className: 'nav-link' },
    { label: 'Compétences', link: 'skills', className: 'nav-link' },
    { label: 'Expériences', link: 'experience', className: 'nav-link' },
    { label: 'Cybersécurité', link: 'cyber', className: 'nav-link' },
    { label: 'Contact', link: 'contact', className: 'nav-link md:hidden' },
  ];

  for (const item of navItems) {
    // Vérifie si un élément avec le même titre existe déjà
    const existingItem = await prisma.itemNavigation.findFirst({
      where: { label: item.label },
    });

    // Si l'élément n'existe pas, il est créé
    if (!existingItem) {
      await prisma.itemNavigation.create({
        data: {
          label: item.label,
          link: item.link,
          className: item.className,
        },
      });
    }
  }

  console.log('Seed data for Navigation items created');
}
