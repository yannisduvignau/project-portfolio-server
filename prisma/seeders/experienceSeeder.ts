import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedExperience() {
  const timelineData = [
    {
      date: '2022 - 2023',
      date_en: '2022 - 2023',
      title: 'Baccalauréat général mention bien',
      title_en: 'A-levels with honours',
      location: 'Lycée Jean-Cassaigne à Mont-de-Marsan',
      location_en: 'Jean Cassaigne High School in Mont-de-Marsan',
      description:
        'Spécialités mathématiques, NSI, physique-chimie avec option maths expertes.',
      description_en:
        'Mathematics, Computer Science, Physics and Chemistry with an expert maths option.',
      priority: 1,
      slug: 'alevel_with_honours',
      masqued: false,
    },
    {
      date: '2023 - 2024',
      date_en: '2023 - 2024',
      title: 'DUT Informatique',
      title_en: 'Computer Science DUT',
      location: 'IUT de Bayonne et du Pays Basque à Anglet',
      location_en: 'Bayonne and Basque Country IUT in Anglet',
      description:
        "Formation couvrant les bases de l'informatique : développement applicatif et web, réseaux, gestion de projets, bases de données, systèmes et sécurité.",
      description_en:
        'Training covering IT fundamentals: application and web development, networks, project management, databases, systems, and security.',
      priority: 2,
      slug: 'computer_science_dut',
      masqued: false,
    },
    {
      date: '04/2024 - 06/2024',
      date_en: '2024/04 - 2024/06',
      title: "Stage en développement d'application web",
      title_en: 'Internship in web application development',
      location: 'The Gill Corporation - France à Anglet',
      location_en: 'The Gill Corporation - France in Anglet',
      description:
        "Stage de 10 semaines axé sur la création complète d'une application de gestion de restaurant d'entreprise.",
      description_en:
        '10-week internship focused on developing a complete corporate restaurant management application.',
      priority: 3,
      slug: 'tgcf_internship', // Correction de la faute dans le slug
      masqued: false,
    },
    {
      date: '2024 - En cours',
      date_en: '2024 - Current',
      title: 'Bachelor en informatique',
      title_en: "Bachelor's degree in computer science",
      location: 'École de Turing à Bordeaux',
      location_en: 'École de Turing in Bordeaux',
      description:
        "Formation en alternance approfondissant les langages avancés, la sécurité informatique, l'IA et la gestion de projets.",
      description_en:
        'Work-study program deepening advanced programming languages, cybersecurity, AI, and project management.',
      priority: 4,
      slug: 'computer_science_bachelor',
      masqued: false,
    },
    {
      date: '2024 - En cours',
      date_en: '2024 - Current',
      title: 'Alternance développeur back-end',
      title_en: 'Trainee back-end developer',
      location: "Snapp' à Bordeaux",
      location_en: "Snapp' in Bordeaux",
      description:
        "Participation au développement d'APIs, de services côté serveur et à la sécurisation des applications.",
      description_en:
        'Contributing to API development, server-side services, and application security.',
      priority: 5,
      slug: 'backend_trainee_dev',
      masqued: false,
    },
  ];

  try {
    for (const item of timelineData) {
      await prisma.experience.upsert({
        where: { slug: item.slug },
        update: {
          date: item.date,
          date_en: item.date_en,
          title: item.title,
          title_en: item.title_en,
          location: item.location,
          location_en: item.location_en,
          description: item.description,
          description_en: item.description_en,
          masqued: item.masqued,
          priority: item.priority,
        },
        create: {
          date: item.date,
          date_en: item.date_en,
          title: item.title,
          title_en: item.title_en,
          location: item.location,
          location_en: item.location_en,
          description: item.description,
          description_en: item.description_en,
          masqued: item.masqued,
          priority: item.priority,
          slug: item.slug,
        },
      });
    }

    console.log('✅ Seed data for Experience created/updated successfully');
  } catch (error) {
    console.error('Error seeding Experience:', error);
  } finally {
    await prisma.$disconnect();
  }
}
