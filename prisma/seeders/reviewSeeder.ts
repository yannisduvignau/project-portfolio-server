import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedReview() {
  const reviews = [
    {
      content:
        'Développement web exceptionnel ! Nous avons livré un site transparent et réactif avec un code propre et une excellente interface utilisateur.',
      content_en:
        'Exceptional web development! Delivered a seamless, responsive site with clean code and great UX.',
      name: 'Sophia Ramirez',
      stars: 5,
      imgSrc: 'sophiaR.jpg',
      company: 'PixelForge',
      slug: 'sr_pixelforge',
      masqued: false,
    },
    {
      content:
        'Un travail impressionnant ! Temps de chargement rapides, design intuitif et intégration parfaite du backend. Je le recommande vivement.',
      content_en:
        'Impressive work! Fast loading times, intuitive design, and flawless backend integration. Highly recommend.',
      name: 'Ethan Caldwell',
      stars: 5,
      imgSrc: 'ethanC.jpeg',
      company: 'NexaWave',
      slug: 'ec_nexawave',
      masqued: false,
    },
    {
      content:
        'Développeur exceptionnel ! Il a construit un site robuste avec une fonctionnalité parfaite. Efficace et soucieux du détail.',
      content_en:
        'Outstanding developer! Built a robust site with perfect functionality. Efficient and detail-oriented.',
      name: 'Liam Bennett',
      stars: 5,
      imgSrc: 'liamB.png',
      company: 'CodeCraft',
      slug: 'lb_codecraft',
      masqued: false,
    },
    {
      content:
        'Créatif et compétent ! A produit un site moderne et convivial qui a dépassé les attentes. Excellente communication.',
      content_en:
        'Creative and skilled! Produced a modern, user-friendly site that exceeded expectations. Great communication.',
      name: 'Noah Williams',
      stars: 5,
      imgSrc: 'noahW.jpeg',
      company: 'BrightWeb',
      slug: 'nw_brightweb', // Correction ici
      masqued: false,
    },
    {
      content:
        'Un travail professionnel ! Livré dans les délais, avec un design soigné et une expérience utilisateur fluide. Développeur hors pair.',
      content_en:
        'Professional work! Delivered on time, with a polished design and smooth user experience. Top-notch developer.',
      name: 'Ava Thompson',
      stars: 5,
      imgSrc: 'avaT.jpg',
      company: 'TechMosaic',
      slug: 'av_techmosaic',
      masqued: false,
    },
    {
      content:
        'Excellente exécution du projet ! Code de haute qualité, conception réactive et compétences exceptionnelles en matière de résolution de problèmes.',
      content_en:
        'Excellent project execution! High-quality code, responsive design, and exceptional problem-solving skills.',
      name: 'Jonathan Rodric',
      stars: 5,
      imgSrc: 'jonathan.jpeg',
      company: 'Skyline Digital',
      slug: 'jr_skylinedigital',
      masqued: false,
    },
  ];

  try {
    for (const item of reviews) {
      await prisma.review.upsert({
        where: { slug: item.slug },
        update: {
          content: item.content,
          content_en: item.content_en,
          stars: item.stars,
          imgSrc: item.imgSrc,
          company: item.company,
          masqued: item.masqued,
        },
        create: {
          name: item.name,
          stars: item.stars,
          imgSrc: item.imgSrc,
          content: item.content,
          content_en: item.content_en,
          company: item.company,
          masqued: item.masqued,
          slug: item.slug,
        },
      });
    }

    console.log('✅ Seed data for Review created/updated successfully');
  } catch (error) {
    console.error('Error seeding reviews:', error);
  } finally {
    await prisma.$disconnect();
  }
}
