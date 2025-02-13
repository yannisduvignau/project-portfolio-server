import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedSection() {
  const navItems = [
    {
      label: 'Curseur',
      label_en: 'Cursor',
      link: 'cursor',
      className: 'hidden',
      priority: 1,
      masqued: false,
      slug: 'cursor',
    },
    {
      label: 'En-tête',
      label_en: 'Header',
      link: 'header',
      className: 'hidden',
      priority: 2,
      masqued: false,
      slug: 'header',
    },
    {
      label: 'Accueil',
      label_en: 'Home',
      link: 'hero',
      className: 'nav-link md:hidden',
      priority: 3,
      masqued: false,
      slug: 'home',
    },
    {
      label: 'A propos',
      label_en: 'About Me',
      link: 'aboutMe',
      className: 'hidden',
      priority: 4,
      masqued: false,
      slug: 'aboutme',
    },
    {
      label: 'Projets',
      label_en: 'Projects',
      link: 'projects',
      className: 'nav-link',
      priority: 5,
      masqued: false,
      slug: 'projects',
    },
    {
      label: 'Compétences',
      label_en: 'Skills',
      link: 'skills',
      className: 'nav-link',
      priority: 6,
      masqued: false,
      slug: 'skills',
    },
    {
      label: 'Bande',
      label_en: 'Tape',
      link: 'tape',
      className: 'hidden',
      priority: 7,
      masqued: false,
      slug: 'tape',
    },
    {
      label: 'Expériences',
      label_en: 'Experiences',
      link: 'experience',
      className: 'nav-link',
      priority: 8,
      masqued: false,
      slug: 'experience',
    },
    {
      label: 'Loisirs',
      label_en: 'Hobbies',
      link: 'hobbies',
      className: 'nav-link',
      priority: 9,
      masqued: true,
      slug: 'hobbies',
    },
    {
      label: 'Cybersécurité',
      label_en: 'Cybersecurity',
      link: 'cyber',
      className: 'nav-link',
      priority: 10,
      masqued: true,
      slug: 'cyber',
    },
    {
      label: 'Testimonial',
      label_en: 'Review',
      link: 'review',
      className: 'nav-link',
      priority: 11,
      masqued: true,
      slug: 'review',
    },
    {
      label: 'Contact',
      label_en: 'Contact',
      link: 'contact',
      className: 'nav-link md:hidden',
      priority: 12,
      masqued: false,
      slug: 'contact',
    },
    {
      label: 'Pied de page',
      label_en: 'Footer',
      link: 'footer',
      className: 'hidden',
      priority: 13,
      masqued: false,
      slug: 'footer',
    },
  ];

  try {
    for (const item of navItems) {
      await prisma.section.upsert({
        where: { slug: item.slug },
        update: {
          label: item.label,
          label_en: item.label,
          link: item.link,
          className: item.className,
          priority: item.priority,
          masqued: item.masqued,
          slug: item.slug,
        },
        create: {
          label: item.label,
          label_en: item.label,
          link: item.link,
          className: item.className,
          priority: item.priority,
          masqued: item.masqued,
          slug: item.slug,
        },
      });
    }

    console.log('✅ Seed data for Section created/updated successfully');
  } catch (error) {
    console.error('Error seeding Section:', error);
  } finally {
    await prisma.$disconnect();
  }
}
