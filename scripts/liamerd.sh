#!/bin/bash
set -a
source .env
set +a

mkdir -p dist
pg_dump --schema-only --file=dist/schema.sql "$DATABASE_URL"
liam erd build --format postgres --input dist/schema.sql
serve dist/
