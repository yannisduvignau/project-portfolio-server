# NestJS README

## Introduction
NestJS est un framework progressif pour construire des applications Node.js côté serveur, basé sur TypeScript et inspiré d'Angular.

## Installation

Assurez-vous d'avoir Node.js installé, puis exécutez :

```sh
npm install -g @nestjs/cli
```

Créer un nouveau projet NestJS :

```sh
nest new my-project
```

Accédez au dossier du projet :

```sh
cd my-project
```

## Structure du Projet

NestJS suit une architecture modulaire. Un projet typique contient :

- `src/` : Contient le code source
- `main.ts` : Fichier d'entrée de l'application
- `app.module.ts` : Module principal
- `app.controller.ts` : Contrôleur principal
- `app.service.ts` : Service principal

## Commandes NestJS

### Démarrer l'application

```sh
npm run start
```

Démarrer en mode watch (hot reload) :

```sh
npm run start:dev
```

Démarrer en mode production :

```sh
npm run start:prod
```

### Générer des éléments

Créer un module :

```sh
nest generate module my-module
```

Créer un contrôleur :

```sh
nest generate controller my-controller
```

Créer un service :

```sh
nest generate service my-service
```

Créer un fournisseur :

```sh
nest generate provider my-provider
```

Créer un middleware :

```sh
nest generate middleware my-middleware
```

Créer une interface :

```sh
nest generate interface my-interface
```

Créer un guard :

```sh
nest generate guard my-guard
```

Créer un filtre d'exception :

```sh
nest generate filter my-filter
```

### Tester l'application

Exécuter les tests unitaires :

```sh
npm run test
```

Exécuter les tests avec watch :

```sh
npm run test:watch
```

Exécuter les tests end-to-end :

```sh
npm run test:e2e
```

### Construire l'application

```sh
npm run build
```

### Linter et formatage

Vérifier le code avec ESLint :

```sh
npm run lint
```

Corriger les erreurs de linting :

```sh
npm run lint --fix
```

## Conclusion
NestJS est un framework puissant et structuré pour le développement d'API et d'applications back-end avec TypeScript. Utilisez ces commandes pour gérer efficacement votre projet.
