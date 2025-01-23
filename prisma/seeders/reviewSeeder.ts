import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedReview() {
  const reviews = [
    {
      content:
        'Exceptional web development! Delivered a seamless, responsive site with clean code and great UX.',
      name: 'Sophia Ramirez',
      stars: 5,
      imgSrc: '/src/assets/sophiaR.jpg',
      company: 'PixelForge',
    },
    {
      content:
        'Impressive work! Fast loading times, intuitive design, and flawless backend integration. Highly recommend.',
      name: 'Ethan Caldwell',
      stars: 5,
      imgSrc: '/src/assets/ethanC.jpeg',
      company: 'NexaWave',
    },
    {
      content:
        'Outstanding developer! Built a robust site with perfect functionality. Efficient and detail-oriented.',
      name: 'Liam Bennett',
      stars: 5,
      imgSrc: '/src/assets/liamB.png',
      company: 'CodeCraft',
    },
    {
      content:
        'Creative and skilled! Produced a modern, user-friendly site that exceeded expectations. Great communication.',
      name: 'Noah Williams',
      stars: 5,
      imgSrc: '/src/assets/noahW.jpeg',
      company: 'BrightWeb',
    },
    {
      content:
        'Professional work! Delivered on time, with a polished design and smooth user experience. Top-notch developer.',
      name: 'Ava Thompson',
      stars: 5,
      imgSrc: '/src/assets/avaT.jpg',
      company: 'TechMosaic',
    },
    {
      content:
        'Excellent project execution! High-quality code, responsive design, and exceptional problem-solving skills.',
      name: 'Jonathan',
      stars: 5,
      imgSrc: '/src/assets/jonathan.jpeg',
      company: 'Skyline Digital',
    },
  ];

  for (const item of reviews) {
    // Vérifie si un élément avec le même titre existe déjà
    const existingItem = await prisma.testimonial.findFirst({
      where: { name: item.name },
    });

    // Si l'élément n'existe pas, il est créé
    if (!existingItem) {
      await prisma.testimonial.create({
        data: {
          name: item.name,
          stars: item.stars,
          imgSrc: item.imgSrc,
          content: item.content,
          compagny: item.company,
        },
      });
    }
  }

  console.log('Seed data for Review created');
}
