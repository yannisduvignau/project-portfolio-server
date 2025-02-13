#!/bin/sh

echo "🔄 Vérification de l'accès à la base de données..."

# Attendre que PostgreSQL soit prêt et que l'utilisateur puisse s'authentifier
until PGPASSWORD="portfolio_local" psql -h db -U portfolio_local -d portfolio_local -c "SELECT 1" > /dev/null 2>&1; do
  echo "⏳ En attente de l'accès à la base de données..."
  sleep 5
done

echo "✅ Connexion réussie ! Vérification des migrations..."

# Attente des migrations Prisma
until npx prisma migrate deploy > /dev/null 2>&1; do
  echo "⏳ Migration en attente... La base de données n'est peut-être pas prête."
  sleep 5
done

echo "✅ Base de données prête. Démarrage du serveur..."
exec npm run start
