import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedExperience() {
  const timelineData = [
    {
      date: '2022 - 2023',
      title: 'Baccalauréat général mention bien',
      location: 'Lycée Jean-Cassaigne à Mont-de-Marsan',
      description:
        'Spécialités mathématiques, NSI, physique-chimie avec option maths expertes',
      priority: 1,
      masqued: false,
    },
    {
      date: '2023 - 2024',
      title: 'DUT Informatique',
      location: 'IUT de Bayonne et du Pays Basque à Anglet',
      description:
        "Au cours de cette formation, j'y ai appris les fondamentaux de l'informatique : conception, développement applicatif et web, réseaux, gestion de projects, communication, base de données, optimisation, systèmes, tests, droit et sécurité.",
      priority: 2,
      masqued: false,
    },
    {
      date: '04/2024 - 06/2024',
      title: "Stage en développement d'application web",
      location: 'The Gill Corporation - France à Anglet',
      description:
        "Dans le cadre de mon DUT, j'ai eu la chance d'effectuer un stage de 10 semaines dans lequel ma mission principale était la réalisation complète d'une application de gestion du restaurant d'entreprise.",
      priority: 3,
      masqued: false,
    },
    {
      date: '2024 - En cours',
      title: 'Bachelor en informatique',
      location: 'Ecole de Turing à Bordeaux',
      description:
        'Formation en alternance qui va me pousser à approfondir les langages de programmation avancés et méthodologies de développement, acquérir une expertise en sécurité informatique, intelligence artificielle et gestion de projects et renforcer mes compétences en communication, leadership et respect des normes et réglementations.',
      priority: 4,
      masqued: false,
    },
    {
      date: '2024 - En cours',
      title: 'Alternance développeur back-end',
      location: "Snapp' à Bordeaux",
      description:
        "Snapp' est une entreprise de développement mobile à l'origine qui tend à se diversifier de plus en plus vers un plus large domaine de développement informatique. J'interviens à Snapp' en tant que alternant dans la cadre de réalisation d'API, de développement côté serveur et de sécurisation.",
      priority: 5,
      masqued: false,
    },
  ];

  for (const item of timelineData) {
    // Vérifie si un élément avec le même title existe déjà
    const existingItem = await prisma.experience.findFirst({
      where: { title: item.title },
    });

    // Si l'élément n'existe pas, il est créé
    if (!existingItem) {
      await prisma.experience.create({
        data: {
          date: item.date,
          title: item.title,
          location: item.location,
          description: item.description,
          masqued: item.masqued,
          priority: item.priority,
        },
      });
    }
  }

  console.log('Seed data for Experience created');
}
