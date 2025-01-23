import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedProject() {
  const works = [
    {
      titre: 'AnguChaudiere',
      imgSrc: '/src/assets/Projet 3 _ site de chaudiere angular.png',
      projectLink: 'https://github.com/yannisduvignau/Projet_angular',
      tags: ['Angular', 'Framework JS', 'Projet scolaire'],
    },
    {
      titre: 'Jeu du Sudoku',
      imgSrc: '/src/assets/placeholder.webp',
      projectLink: 'https://github.com/yannisduvignau/Sudoku',
      tags: ['C++', 'Projet scolaire'],
    },
    {
      titre: 'Lecteur de diaporama',
      imgSrc: '/src/assets/placeholder.webp',
      projectLink: 'https://github.com/yannisduvignau/LecteurDiaporama',
      tags: ['Qt', 'Framework C++', 'Projet scolaire'],
    },
    {
      titre: 'Tic Tac Toe',
      imgSrc: '/src/assets/Projet 5 _ morpion react.png',
      projectLink: 'https://github.com/yannisduvignau/Morpion',
      tags: ['Initiation React', 'Projet perso'],
    },
    {
      titre: 'MeetEvent',
      imgSrc: '/src/assets/meetevent.png',
      projectLink: 'https://github.com/mattin-guiheneuf/S4.01-MeetEvent',
      tags: ['Application événementiel', 'Projet scolaire', 'Agile (Scrum)'],
    },
    {
      titre: 'Le Bien Etre Du Cocon',
      imgSrc: '/src/assets/Projet 2 _ site amelie.png',
      projectLink: 'https://www.lebienetreducocon.fr',
      tags: ['Laravel', 'Framework PHP', 'Projet client'],
    },
    {
      titre: 'Angular cours en ligne',
      imgSrc: '/src/assets/Projet 1 _ site de cours angular.png',
      projectLink: 'https://github.com/yannisduvignau/Angular_Cours',
      tags: ['Angular', 'Framework JS', 'Projet scolaire'],
    },
    {
      titre: 'Web Portfolio',
      imgSrc: '/src/assets/placeholder.webp',
      projectLink: 'https://github.com/yannisduvignau/Portfolio',
      tags: ['React JS', 'Tailwind CSS', 'Framer motion', 'Projet perso'],
    },
    {
      titre: "API d'AUTH sécurisée",
      imgSrc: "/src/assets/Projet 6 _ api d'auth fastApi.png",
      projectLink: 'https://github.com/yannisduvignau/FastApi',
      tags: ['FastApi', 'Framework Python', 'Projet perso'],
    },
  ];

  for (const item of works) {
    // Vérifie si un élément avec le même titre existe déjà
    const existingItem = await prisma.project.findFirst({
      where: { titre: item.titre },
    });

    // Si l'élément n'existe pas, il est créé
    if (!existingItem) {
      await prisma.project.create({
        data: {
          titre: item.titre,
          imgSrc: item.imgSrc,
          projectLink: item.projectLink,
          tags: item.tags,
        },
      });
    }
  }

  console.log('Seed data for Project created');
}
