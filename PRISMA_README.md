# Prisma README

## Introduction
Prisma est un ORM (Object-Relational Mapping) moderne pour Node.js et TypeScript. Il simplifie l'interaction avec la base de données en fournissant une API intuitive et performante.

## Installation

Assurez-vous d'avoir Node.js installé, puis exécutez :

```sh
npm install @prisma/client
npm install --save-dev prisma
```

Initialiser Prisma dans votre projet :

```sh
npx prisma init
```

Cela crée un dossier `prisma/` contenant le fichier `schema.prisma`.

## Configuration

Dans le fichier `.env`, configurez votre connexion à la base de données :

```env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
```

Dans `schema.prisma`, définissez votre modèle :

```prisma
model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
}
```

## Commandes Prisma

### Générer le client Prisma

```sh
npx prisma generate
```

Génère le client Prisma pour interagir avec la base de données.

### Migration de la base de données

Créer une migration :

```sh
npx prisma migrate dev --name init
```

Appliquer les migrations en production :

```sh
npx prisma migrate deploy
```

### Visualiser la base de données

```sh
npx prisma studio
```

Ouvre une interface web pour gérer les données.

### Vérifier la connexion à la base de données

```sh
npx prisma db push
```

### Réinitialiser la base de données

```sh
npx prisma migrate reset
```

### Exécuter Prisma dans du code JavaScript/TypeScript

Exemple d'utilisation dans un fichier `index.ts` :

```ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: { name: 'Alice', email: 'alice@example.com' }
  });
  console.log(user);
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
```

## Conclusion
Prisma est un ORM puissant et intuitif, simplifiant la gestion des bases de données en Node.js. Utilisez les commandes ci-dessus pour structurer et interagir efficacement avec votre base de données.