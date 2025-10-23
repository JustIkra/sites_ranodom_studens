#!/bin/bash
# Production Deployment Script
# For deployment on 172.30.4.14 with Nginx Proxy Manager + ZeroTier

set -e  # Exit on error

echo "========================================"
echo "Production Deployment Script"
echo "========================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${RED}Error: .env file not found!${NC}"
    echo "Please copy .env.production to .env and configure it:"
    echo "  cp .env.production .env"
    echo "  nano .env  # Edit the file"
    exit 1
fi

# Check if required variables are set
if grep -q "CHANGE_ME" .env; then
    echo -e "${RED}Error: Please update SECRET_KEY values in .env file!${NC}"
    echo "Generate secret keys with:"
    echo "  python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'"
    exit 1
fi

echo -e "${GREEN}✓ Environment file validated${NC}"

# Build frontend
echo ""
echo "========================================"
echo "Building Frontend (React + Vite)"
echo "========================================"

cd sitefinal/new-zakaz

if [ ! -d "node_modules" ]; then
    echo "Installing npm dependencies..."
    npm install
fi

echo "Building production bundle..."
npm run build

if [ ! -d "dist" ]; then
    echo -e "${RED}Error: Build failed, dist/ directory not found${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Frontend built successfully${NC}"

# Copy built files to Django static
echo "Copying built files to Django templates/static..."
cd ../..
rm -rf sitefinal/templates/*
rm -rf sitefinal/static/assets/*
mkdir -p sitefinal/templates
mkdir -p sitefinal/static/assets

cp sitefinal/new-zakaz/dist/index.html sitefinal/templates/
cp -r sitefinal/new-zakaz/dist/assets/* sitefinal/static/assets/ 2>/dev/null || true

echo -e "${GREEN}✓ Files copied to Django${NC}"

# Stop existing containers
echo ""
echo "========================================"
echo "Stopping Existing Containers"
echo "========================================"
docker-compose down

# Build and start containers
echo ""
echo "========================================"
echo "Building and Starting Containers"
echo "========================================"
docker-compose up -d --build

# Wait for containers to start
echo "Waiting for containers to start..."
sleep 5

# Check container status
if ! docker ps | grep -q "sitefinal"; then
    echo -e "${RED}Error: sitefinal container failed to start${NC}"
    echo "Check logs with: docker logs sitefinal"
    exit 1
fi

if ! docker ps | grep -q "visitka"; then
    echo -e "${RED}Error: visitka container failed to start${NC}"
    echo "Check logs with: docker logs visitka"
    exit 1
fi

echo -e "${GREEN}✓ Containers started successfully${NC}"

# Run migrations for sitefinal
echo ""
echo "========================================"
echo "Running Migrations (sitefinal)"
echo "========================================"
docker exec sitefinal python manage.py migrate --noinput

# Collect static files for sitefinal
echo "Collecting static files (sitefinal)..."
docker exec sitefinal python manage.py collectstatic --noinput

echo -e "${GREEN}✓ sitefinal configured${NC}"

# Run migrations for visitka
echo ""
echo "========================================"
echo "Running Migrations (visitka)"
echo "========================================"
docker exec visitka python manage.py migrate --noinput

# Collect static files for visitka
echo "Collecting static files (visitka)..."
docker exec visitka python manage.py collectstatic --noinput

echo -e "${GREEN}✓ visitka configured${NC}"

# Display status
echo ""
echo "========================================"
echo "Deployment Complete!"
echo "========================================"
echo ""
echo -e "${GREEN}Services are running:${NC}"
echo "  - sitefinal (Django + React): http://172.30.4.14:8001"
echo "  - visitka (Django): http://172.30.4.14:8000"
echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "  1. Configure Nginx Proxy Manager:"
echo "     - Add proxy host for sitefinal: 172.30.4.14:8001"
echo "     - Add proxy host for visitka: 172.30.4.14:8000"
echo "  2. When domain is configured, update .env:"
echo "     - Add domain to DJANGO_ALLOWED_HOSTS"
echo "     - Update CORS and CSRF origins"
echo "     - Re-run: ./deploy_production.sh"
echo "  3. Create superuser for admin access:"
echo "     docker exec -it sitefinal python manage.py createsuperuser"
echo "     docker exec -it visitka python manage.py createsuperuser"
echo ""
echo -e "${YELLOW}Useful Commands:${NC}"
echo "  - View logs: docker-compose logs -f"
echo "  - View specific service: docker logs sitefinal"
echo "  - Restart: docker-compose restart"
echo "  - Stop: docker-compose down"
echo ""
