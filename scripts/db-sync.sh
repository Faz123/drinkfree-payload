#! /bin/bash
# This script syncs the local development environment to the production environment using the backup 'neon_backup.sql' if it exists.

# Get the directory of this script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$SCRIPT_DIR/.."

# load the environment variables from the .env file in the project root
if [ -f "$PROJECT_ROOT/.env" ]; then
    export $(grep -v '^#' "$PROJECT_ROOT/.env" | xargs)
else
    echo ".env file not found in project root ($PROJECT_ROOT). Please create one with the necessary environment variables."
    exit 1
fi

DB_USER="postgres"
DB_PASSWORD="postgres"
DB_NAME="payload"


# Check if the Docker container is running
if [ ! "$(docker ps -q -f name=drinkfree-payload-db-1)" ]; then
    echo "Docker container 'drinkfree-payload-db-1' is not running."
    exit 1
fi

# Copy the backup file from the project root to the Docker container
docker cp "$PROJECT_ROOT/scripts/db-backups/neon_backup.sql" drinkfree-payload-db-1:/neon_backup.sql
if [ $? -ne 0 ]; then
    echo "Failed to copy the backup file to the Docker container."
    exit 1
fi

# Check if the backup file exists in the docker container
BACKUP_FILE="/neon_backup.sql"
if [ ! "$(docker exec drinkfree-payload-db-1 ls $BACKUP_FILE 2>/dev/null)" ]; then
    echo "Backup file 'neon_backup.sql' not found in the Docker container."
    exit 1
fi


# Restore the database from the backup file
docker exec -e PGPASSWORD="$DB_PASSWORD" -t drinkfree-payload-db-1 pg_restore -c --no-owner --no-privileges -d postgres://$DB_USER:$DB_PASSWORD@127.0.0.1:5432/$DB_NAME /neon_backup.sql
if [ $? -ne 0 ]; then
    echo "Database restore failed. Please check the backup file and try again."
    exit 1
fi
echo "Database restore completed successfully."

# Remove the backup file from the Docker container
docker exec -t drinkfree-payload-db-1 rm /neon_backup.sql
if [ $? -ne 0 ]; then
    echo "Failed to remove the backup file from the Docker container."
    exit 1
fi
echo "Backup file removed from the Docker container."

