#!/bin/sh

# Attendre que PostgreSQL soit prêt
# echo "🔄 Vérification de l'accès à la base de données..."
# until PGPASSWORD="portfolio_password" psql -h db -U portfolio_local -d portfolio_local -c "SELECT 1" > /dev/null 2>&1; do
#   echo "⏳ En attente de l'accès à la base de données..."
#   sleep 5
# done
# echo "✅ Connexion réussie !"

set -ex
npm run start:migrate:prod