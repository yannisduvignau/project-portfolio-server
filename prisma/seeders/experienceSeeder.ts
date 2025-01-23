import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedExperience() {
  const timelineData = [
    {
      date: '2022 - 2023',
      titre: 'Baccalauréat général mention bien',
      localisation: 'Lycée Jean-Cassaigne à Mont-de-Marsan',
      description:
        'Spécialités mathématiques, NSI, physique-chimie avec option maths expertes',
    },
    {
      date: '2023 - 2024',
      titre: 'DUT Informatique',
      localisation: 'IUT de Bayonne et du Pays Basque à Anglet',
      description:
        "Au cours de cette formation, j'y ai appris les fondamentaux de l'informatique : conception, développement applicatif et web, réseaux, gestion de projects, communication, base de données, optimisation, systèmes, tests, droit et sécurité.",
    },
    {
      date: '04/2024 - 06/2024',
      titre: "Stage en développement d'application web",
      localisation: 'The Gill Corporation - France à Anglet',
      description:
        "Dans le cadre de mon DUT, j'ai eu la chance d'effectuer un stage de 10 semaines dans lequel ma mission principale était la réalisation complète d'une application de gestion du restaurant d'entreprise.",
    },
    {
      date: '2024 - En cours',
      titre: 'Bachelor en informatique',
      localisation: 'Ecole de Turing à Bordeaux',
      description:
        'Formation en alternance qui va me pousser à approfondir les langages de programmation avancés et méthodologies de développement, acquérir une expertise en sécurité informatique, intelligence artificielle et gestion de projects et renforcer mes compétences en communication, leadership et respect des normes et réglementations.',
    },
    {
      date: '2024 - En cours',
      titre: 'Alternance développeur back-end',
      localisation: "Snapp' à Bordeaux",
      description:
        "Snapp' est une entreprise de développement mobile à l'origine qui tend à se diversifier de plus en plus vers un plus large domaine de développement informatique. J'interviens à Snapp' en tant que alternant dans la cadre de réalisation d'API, de développement côté serveur et de sécurisation.",
    },
  ];

  for (const item of timelineData) {
    // Vérifie si un élément avec le même titre existe déjà
    const existingItem = await prisma.experience.findFirst({
      where: { titre: item.titre },
    });

    // Si l'élément n'existe pas, il est créé
    if (!existingItem) {
      await prisma.experience.create({
        data: {
          date: item.date,
          titre: item.titre,
          localisation: item.localisation,
          description: item.description,
        },
      });
    }
  }

  console.log('Seed data for Experience created');
}
