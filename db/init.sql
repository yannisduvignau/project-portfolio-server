-- Vérifie si l'utilisateur existe avant de le créer
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'portfolio_local') THEN
        CREATE ROLE portfolio_local WITH LOGIN PASSWORD 'portfolio_password';
    END IF;
END $$;

-- Vérifie si la base de données existe avant de la créer
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'portfolio_local') THEN
        CREATE DATABASE portfolio_local OWNER portfolio_local;
    END IF;
END $$;

-- Donner les permissions nécessaires à l'utilisateur sur la base
GRANT CONNECT ON DATABASE portfolio_local TO portfolio_local;
GRANT ALL PRIVILEGES ON DATABASE portfolio_local TO portfolio_local;
