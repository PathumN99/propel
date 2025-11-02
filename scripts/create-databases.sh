#!/bin/bash
set -e
if [ -n "$POSTGRES_MULTIPLE_DATABASES" ]; then
    echo "Creating databases: $POSTGRES_MULTIPLE_DATABASES"
    # Loop through the databases .env variable (ex- n8n,documents) and creates them
    for db in $(echo $POSTGRES_MULTIPLE_DATABASES | tr "," " "); do
        echo "Creating database $db"
        # Executes the postgres command to create the database
        psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" -c "CREATE DATABASE $db;"
    done
    echo "Databases created successfully"
fi
