# ================================
# BUILD FOR PRODUCTION
# ================================
FROM node:20.11.1-alpine AS base

ENV NODE_ENV="production"

# ================================
# INSTALLER STAGE (Dépendances + Build)
# ================================
FROM base AS installer

RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copie uniquement les fichiers nécessaires pour installer les dépendances
COPY --chown=node:node ./server/package*.json ./
COPY --chown=node:node ./server/tsconfig*.json ./
COPY --chown=node:node ./server/prisma ./prisma

# Installation propre des dépendances
RUN npm ci --include=dev

# Génération des fichiers Prisma
RUN npx prisma generate

# Copie du reste du code après l'installation des dépendances (optimisation du cache)
COPY --chown=node:node ./server/ .

# Compilation du projet
RUN npm run build

# ================================
# PRUNNER STAGE (Préparation)
# ================================
FROM base AS prunner
WORKDIR /app

# Copie uniquement les fichiers nécessaires pour exécuter le projet
COPY --from=installer /app/node_modules ./node_modules
COPY --from=installer /app/package.json ./package.json
COPY --from=installer /app/tsconfig.json ./tsconfig.json

# ================================
# RUNNER STAGE (Exécution)
# ================================
FROM base AS runner
WORKDIR /app

ENV TZ=Europe/Paris

# Configuration du fuseau horaire
RUN apk add --no-cache tzdata \
    && cp /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone \
    && apk del tzdata

# Création et utilisation d'un utilisateur sécurisé
RUN addgroup --system --gid 1024 nodejs
RUN adduser --system --uid 1024 nestjs
USER nestjs

# Copie des fichiers nécessaires pour exécuter l'application
COPY --chown=nestjs:nodejs --from=prunner /app/package.json ./package.json
COPY --chown=nestjs:nodejs --from=prunner /app/tsconfig.json ./tsconfig.json
COPY --chown=nestjs:nodejs --from=installer /app/dist ./dist
COPY --chown=nestjs:nodejs --from=prunner /app/node_modules ./node_modules
COPY --chown=nestjs:nodejs --from=installer /app/start.sh ./start.sh
COPY --chown=nestjs:nodejs --from=installer /app/prisma ./prisma

# Expose le port d'écoute de l'application
EXPOSE 8000

# Démarrage de l'application
CMD ["sh", "start.sh"]