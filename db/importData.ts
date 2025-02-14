import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

function getLatestBackup(): string | null {
  const backupDir = path.resolve(__dirname); // Puisque tu es déjà dans `db/`
  const backups = fs
    .readdirSync(backupDir)
    .filter((folder) => folder.startsWith('backup-')) // Filtrer uniquement les dossiers backup
    .sort()
    .reverse(); // Trier pour avoir le plus récent en premier

  if (backups.length === 0) {
    console.error('❌ Aucun backup trouvé.');
    return null;
  }

  return path.join(backupDir, backups[0], 'export.json'); // Retourne le fichier du dernier backup
}

async function importData() {
  const latestBackup = getLatestBackup();
  if (!latestBackup) {
    console.error('❌ Aucune sauvegarde récente trouvée.');
    return;
  }

  console.log(`📂 Chargement du dernier backup : ${latestBackup}`);

  const data = JSON.parse(fs.readFileSync(latestBackup, 'utf8'));

  for (const table in data) {
    if (!prisma[table]) {
      console.warn(`⚠️ Modèle "${table}" introuvable dans Prisma. Ignoré.`);
      continue;
    }

    try {
      await prisma[table].createMany({
        data: data[table].map(({ id, ...rest }) => rest), // Ignore l'ID s'il est auto-incrémenté
        skipDuplicates: true, // Évite les erreurs si les données existent déjà
      });
      console.log(`✅ Importation réussie pour la table "${table}".`);
    } catch (error) {
      console.error(`❌ Erreur lors de l'importation de "${table}":`, error);
    }
  }

  console.log('🚀 Importation terminée.');
}

importData().finally(() => prisma.$disconnect());
