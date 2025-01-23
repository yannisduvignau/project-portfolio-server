import { PrismaClient } from '@prisma/client';
import { seedAbout } from './seeders/aboutSeeder';
import { seedUser } from './seeders/userSeeder';
import { seedExperience } from './seeders/experienceSeeder';
import { seedPassions } from './seeders/passionSeeder';
import { seedNavigation } from './seeders/navigationSeeder';
import { seedReview } from './seeders/reviewSeeder';
import { seedSkill } from './seeders/skillSeeder';
import { seedProject } from './seeders/projectSeeder';

const prisma = new PrismaClient();

async function main() {
  await seedUser();
  await seedAbout();
  await seedExperience();
  await seedPassions();
  await seedNavigation();
  await seedProject();
  await seedReview();
  await seedSkill();
  console.log('✅ Seed data has been inserted successfully.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
