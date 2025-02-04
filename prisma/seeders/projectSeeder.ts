import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedProject() {
  const works = [
    {
      title: 'AnguChaudiere',
      imgSrc: '/src/assets/Projet 3 _ site de chaudiere angular.png',
      projectLink: 'https://github.com/yannisduvignau/Projet_angular',
      tags: ['Angular', 'Framework JS', 'Projet scolaire'],
      priority: 1,
      masqued: false,
    },
    {
      title: 'Jeu du Sudoku',
      imgSrc: '/src/assets/placeholder.webp',
      projectLink: 'https://github.com/yannisduvignau/Sudoku',
      tags: ['C++', 'Projet scolaire'],
      priority: 2,
      masqued: false,
    },
    {
      title: 'Lecteur de diaporama',
      imgSrc: '/src/assets/placeholder.webp',
      projectLink: 'https://github.com/yannisduvignau/LecteurDiaporama',
      tags: ['Qt', 'Framework C++', 'Projet scolaire'],
      priority: 3,
      masqued: false,
    },
    {
      title: 'Tic Tac Toe',
      imgSrc: '/src/assets/Projet 5 _ morpion react.png',
      projectLink: 'https://github.com/yannisduvignau/Morpion',
      tags: ['Initiation React', 'Projet perso'],
      priority: 4,
      masqued: false,
    },
    {
      title: 'MeetEvent',
      imgSrc: '/src/assets/meetevent.png',
      projectLink: 'https://github.com/mattin-guiheneuf/S4.01-MeetEvent',
      tags: ['Application événementiel', 'Projet scolaire', 'Agile (Scrum)'],
      priority: 5,
      masqued: false,
    },
    {
      title: 'Le Bien Etre Du Cocon',
      imgSrc: '/src/assets/Projet 2 _ site amelie.png',
      projectLink: 'https://www.lebienetreducocon.fr',
      tags: ['Laravel', 'Framework PHP', 'Projet client'],
      priority: 6,
      masqued: false,
    },
    {
      title: 'Angular cours en ligne',
      imgSrc: '/src/assets/Projet 1 _ site de cours angular.png',
      projectLink: 'https://github.com/yannisduvignau/Angular_Cours',
      tags: ['Angular', 'Framework JS', 'Projet scolaire'],
      priority: 7,
      masqued: false,
    },
    {
      title: 'Web Portfolio',
      imgSrc: '/src/assets/placeholder.webp',
      projectLink: 'https://github.com/yannisduvignau/Portfolio',
      tags: ['React JS', 'Tailwind CSS', 'Framer motion', 'Projet perso'],
      priority: 8,
      masqued: false,
    },
    {
      title: "API d'AUTH sécurisée",
      imgSrc: "/src/assets/Projet 6 _ api d'auth fastApi.png",
      projectLink: 'https://github.com/yannisduvignau/FastApi',
      tags: ['FastApi', 'Framework Python', 'Projet perso'],
      priority: 9,
      masqued: false,
    },
  ];

  for (const item of works) {
    // Vérifie si un élément avec le même title existe déjà
    const existingItem = await prisma.project.findFirst({
      where: { title: item.title },
    });

    // Si l'élément n'existe pas, il est créé
    if (!existingItem) {
      await prisma.project.create({
        data: {
          title: item.title,
          imgSrc: item.imgSrc,
          projectLink: item.projectLink,
          tags: item.tags,
          priority: item.priority,
          masqued: item.masqued,
        },
      });
    }
  }

  console.log('Seed data for Project created');
}
