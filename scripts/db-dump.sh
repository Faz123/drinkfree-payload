#! /bin/bash
# This script dumps the postgres database to a file.

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

# set environment variables for the database connection equal to the values in the .env file

# Check if the Docker container is running
if [ ! "$(docker ps -q -f name=drinkfree-payload-db-1)" ]; then
    echo "Docker container 'drinkfree-payload-db-1' is not running."
    exit 1
fi
docker exec -t drinkfree-payload-db-1 pg_dump -Fc -v -d "$NEON_UNPOOLED_URI" -f  neon_backup.sql
if [ $? -ne 0 ]; then
    echo "Database dump failed. Please check the connection and try again."
    exit 1
fi
echo "Database dump completed successfully."
# Copy the dump file to the project root
docker cp drinkfree-payload-db-1:neon_backup.sql "$PROJECT_ROOT/scripts/db-backups/neon_backup.sql"
if [ $? -ne 0 ]; then
    echo "Failed to copy the dump file to the project root."
    exit 1
fi
echo "Dump file copied to $PROJECT_ROOT/scripts/db-backups/neon_backup.sql"