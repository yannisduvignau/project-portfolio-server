import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function getAllTables(): Promise<string[]> {
  const tablesQuery = `SELECT tablename FROM pg_tables WHERE schemaname='public';`; // PostgreSQL
  // Pour MySQL : const tablesQuery = "SHOW TABLES;";
  // Pour SQLite : const tablesQuery = "SELECT name FROM sqlite_master WHERE type='table';";

  const tables: { tablename: string }[] =
    await prisma.$queryRawUnsafe(tablesQuery);
  return tables.map((t) => Object.values(t)[0]);
}

async function exportAllData() {
  const tables = await getAllTables();
  const data: Record<string, any[]> = {};

  for (const table of tables) {
    try {
      data[table] = await prisma.$queryRawUnsafe(`SELECT * FROM "${table}"`);
    } catch (error) {
      console.error(`❌ Erreur lors de l'export de "${table}":`, error);
    }
  }

  // Générer un dossier avec la date et l'heure
  const now = new Date();
  const timestamp = now.toISOString().replace(/[:T]/g, '-').split('.')[0]; // Format YYYY-MM-DD_HH-MM-SS
  const backupFolder = path.join(__dirname, `backup-${timestamp}`);

  // Créer le dossier s'il n'existe pas
  if (!fs.existsSync(backupFolder)) {
    fs.mkdirSync(backupFolder, { recursive: true });
  }

  // Écriture du fichier dans le dossier
  const filePath = path.join(backupFolder, 'export.json');
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`✅ Exportation terminée : ${filePath}`);
  } catch (error) {
    console.error(
      "❌ Erreur lors de l'écriture du fichier export.json:",
      error,
    );
  }
}

exportAllData().finally(() => prisma.$disconnect());
