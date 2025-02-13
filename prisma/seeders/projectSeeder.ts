import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedProject() {
  const works = [
    {
      title: 'AnguChaudiere',
      title_en: 'AnguChaudiere',
      imgSrc: 'Projet 3 _ site de chaudiere angular.png',
      projectLink: 'https://github.com/yannisduvignau/Projet_angular',
      tags: ['Angular', 'Framework JS', 'Projet scolaire'],
      tags_en: ['Angular', 'Framework JS', 'School project'],
      priority: 1,
      slug: 'anguchaudiere',
      masqued: false,
    },
    {
      title: 'Jeu du Sudoku',
      title_en: 'Sudoku Game',
      imgSrc: 'placeholder.webp',
      projectLink: 'https://github.com/yannisduvignau/Sudoku',
      tags: ['C++', 'Projet scolaire'],
      tags_en: ['C++', 'School project'],
      priority: 2,
      slug: 'sudoku-game',
      masqued: false,
    },
    {
      title: 'Lecteur de diaporama',
      title_en: 'Slideshow Viewer',
      imgSrc: 'placeholder.webp',
      projectLink: 'https://github.com/yannisduvignau/LecteurDiaporama',
      tags: ['Qt', 'Framework C++', 'Projet scolaire'],
      tags_en: ['Qt', 'C++ Framework', 'School project'],
      priority: 3,
      slug: 'slideshow-viewer',
      masqued: false,
    },
    {
      title: 'Tic Tac Toe',
      title_en: 'Tic Tac Toe',
      imgSrc: 'Projet 5 _ morpion react.png',
      projectLink: 'https://github.com/yannisduvignau/Morpion',
      tags: ['Initiation React', 'Projet perso'],
      tags_en: ['React Introduction', 'Personal project'],
      priority: 4,
      slug: 'tic-tac-toe',
      masqued: false,
    },
    {
      title: 'MeetEvent',
      title_en: 'MeetEvent',
      imgSrc: 'meetevent.png',
      projectLink: 'https://github.com/mattin-guiheneuf/S4.01-MeetEvent',
      tags: ['Application événementiel', 'Projet scolaire', 'Agile (Scrum)'],
      tags_en: ['Event app', 'School project', 'Agile (Scrum)'],
      priority: 5,
      slug: 'meetevent',
      masqued: false,
    },
    {
      title: 'Le Bien Etre Du Cocon',
      title_en: 'The Well-Being of the Cocoon',
      imgSrc: 'Projet 2 _ site amelie.png',
      projectLink: 'https://www.lebienetreducocon.fr',
      tags: ['Laravel', 'Framework PHP', 'Projet client'],
      tags_en: ['Laravel', 'PHP Framework', 'Client project'],
      priority: 6,
      slug: 'bien-etre-cocon',
      masqued: false,
    },
    {
      title: 'Angular cours en ligne',
      title_en: 'Angular Online Course',
      imgSrc: 'Projet 1 _ site de cours angular.png',
      projectLink: 'https://github.com/yannisduvignau/Angular_Cours',
      tags: ['Angular', 'Framework JS', 'Projet scolaire'],
      tags_en: ['Angular', 'JS Framework', 'School project'],
      priority: 7,
      slug: 'angular-course',
      masqued: false,
    },
    {
      title: 'Web Portfolio',
      title_en: 'Web Portfolio',
      imgSrc: 'placeholder.webp',
      projectLink: 'https://github.com/yannisduvignau/Portfolio',
      tags: ['React JS', 'Tailwind CSS', 'Framer motion', 'Projet perso'],
      tags_en: [
        'React JS',
        'Tailwind CSS',
        'Framer motion',
        'Personal project',
      ],
      priority: 8,
      slug: 'web-portfolio',
      masqued: false,
    },
    {
      title: "API d'AUTH sécurisée",
      title_en: 'Secure AUTH API',
      imgSrc: "Projet 6 _ api d'auth fastApi.png",
      projectLink: 'https://github.com/yannisduvignau/FastApi',
      tags: ['FastApi', 'Framework Python', 'Projet perso'],
      tags_en: ['FastApi', 'Python Framework', 'Personal project'],
      priority: 9,
      slug: 'secure-auth-api',
      masqued: false,
    },
  ];

  try {
    for (const item of works) {
      await prisma.project.upsert({
        where: { slug: item.slug },
        update: {
          title: item.title,
          title_en: item.title_en,
          imgSrc: item.imgSrc,
          projectLink: item.projectLink,
          tags: item.tags,
          tags_en: item.tags_en,
          priority: item.priority,
          masqued: item.masqued,
          slug: item.slug,
        },
        create: {
          title: item.title,
          title_en: item.title_en,
          imgSrc: item.imgSrc,
          projectLink: item.projectLink,
          tags: item.tags,
          tags_en: item.tags_en,
          priority: item.priority,
          masqued: item.masqued,
          slug: item.slug,
        },
      });
    }

    console.log('✅ Seed data for Projects created/updated successfully');
  } catch (error) {
    console.error('Error seeding Projects:', error);
  } finally {
    await prisma.$disconnect();
  }
}
