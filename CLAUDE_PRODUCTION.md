# Production Deployment Guide

Complete guide for deploying to production on **172.30.4.14** via **ZeroTier** with **Nginx Proxy Manager**.

---

## Architecture Overview

```
Internet/ZeroTier Network
         ↓
   Nginx Proxy Manager (UI-based reverse proxy)
         ↓
   172.30.4.14 (ZeroTier IP)
         ↓
   Docker Containers:
   - sitefinal:8001 (Django REST API + React SPA)
   - visitka:8000 (Django template-based app)
```

---

## Quick Start

```bash
# 1. Configure environment
cp .env.production .env
# Edit .env: add SECRET_KEY values

# 2. Deploy
chmod +x deploy_production.sh
./deploy_production.sh

# 3. Create superusers
docker exec -it sitefinal python manage.py createsuperuser
docker exec -it visitka python manage.py createsuperuser

# 4. Configure Nginx Proxy Manager (see section below)
```

---

## Prerequisites

### On Server (172.30.4.14)

1. **Docker & Docker Compose** installed
   ```bash
   # Install Docker
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER

   # Install Docker Compose
   sudo apt-get install docker-compose-plugin
   ```

2. **ZeroTier** installed and connected
   ```bash
   # Install ZeroTier
   curl -s https://install.zerotier.com | sudo bash

   # Join network
   sudo zerotier-cli join YOUR_NETWORK_ID

   # Verify connection
   sudo zerotier-cli listnetworks
   # Ensure 172.30.4.14 is assigned
   ```

3. **Nginx Proxy Manager** accessible (can run on same or different server)

### On Your Local Machine

1. **Node.js** (for building React frontend if not on server)
2. **Git** access to repository
3. **ZeroTier** access to 172.30.4.14

---

## Step 1: Initial Setup

### 1.1 Clone Repository

```bash
cd /opt  # or /home/user/apps
git clone <repository-url> sites_ranodom_studens
cd sites_ranodom_studens
```

### 1.2 Configure Environment Variables

```bash
# Copy production template
cp .env.production .env

# Generate secret keys
python3 -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'
```

**Edit `.env` file:**
```bash
nano .env
```

**Required changes:**
```bash
# Generate TWO different keys (run the python command twice)
FINAL_SECRET_KEY=your-generated-key-here-50-chars
VISITKA_SECRET_KEY=another-generated-key-here-50-chars

# Production mode
DJANGO_ENV=production
DJANGO_DEBUG=0

# Initial configuration (IP only)
DJANGO_ALLOWED_HOSTS=172.30.4.14

# CORS and CSRF (update when domain is added)
DJANGO_CORS_ORIGINS=http://172.30.4.14,http://172.30.4.14:8001
DJANGO_CSRF_TRUSTED_ORIGINS=http://172.30.4.14,http://172.30.4.14:8001
```

### 1.3 Build React Frontend

```bash
cd sitefinal/new-zakaz
npm install
npm run build
cd ../..
```

Verify build succeeded:
```bash
ls -la sitefinal/new-zakaz/dist/
# Should see index.html and assets/
```

---

## Step 2: Deploy with Docker

### 2.1 Run Automated Deployment Script

```bash
chmod +x deploy_production.sh
./deploy_production.sh
```

**What this script does:**
- ✅ Validates `.env` configuration
- ✅ Builds React frontend (npm run build)
- ✅ Copies built files to Django static/templates
- ✅ Builds Docker images
- ✅ Starts containers
- ✅ Runs database migrations
- ✅ Collects static files

### 2.2 Verify Deployment

```bash
# Check containers are running
docker ps

# Expected output:
# CONTAINER ID   IMAGE                     STATUS    PORTS
# <id>           sitefinal                 Up        0.0.0.0:8001->8001/tcp
# <id>           visitka                   Up        0.0.0.0:8000->8000/tcp

# Check logs
docker-compose logs -f
```

### 2.3 Test Direct Access

```bash
# From within ZeroTier network:
curl http://172.30.4.14:8001/api/projects/
curl http://172.30.4.14:8000/

# Should return HTML/JSON, not errors
```

### 2.4 Create Admin Users

```bash
# Create superuser for sitefinal
docker exec -it sitefinal python manage.py createsuperuser
# Enter username, email, password

# Create superuser for visitka
docker exec -it visitka python manage.py createsuperuser
```

---

## Step 3: Configure Nginx Proxy Manager

### 3.1 Access NPM Interface

Navigate to your Nginx Proxy Manager web interface:
- Usually: `http://<npm-server-ip>:81`
- Default login: `admin@example.com` / `changeme`

### 3.2 Add Proxy Host for Sitefinal (Main Site)

**Configuration for IP Access (Initial Setup):**

1. **Proxy Hosts** → **Add Proxy Host**
2. **Details Tab:**
   - **Domain Names:** `172.30.4.14`
   - **Scheme:** `http`
   - **Forward Hostname/IP:** `172.30.4.14`
   - **Forward Port:** `8001`
   - **Cache Assets:** ✅ Enabled
   - **Block Common Exploits:** ✅ Enabled
   - **Websockets Support:** ❌ Disabled
   - **Access List:** None (or configure as needed)

3. **Custom Locations:** Leave empty
4. **Advanced:** (Optional)
   ```nginx
   # Add these if needed:
   proxy_set_header Host $host;
   proxy_set_header X-Real-IP $remote_addr;
   proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
   proxy_set_header X-Forwarded-Proto $scheme;
   ```

5. Click **Save**

**After Domain is Configured:**

1. Edit the proxy host
2. **Domain Names:** Update to `yourdomain.com www.yourdomain.com`
3. **SSL Tab:**
   - **SSL Certificate:** Request a New SSL Certificate
   - **Email Address:** your@email.com
   - ✅ Agree to Let's Encrypt Terms
   - ✅ Force SSL
   - ✅ HTTP/2 Support
   - ✅ HSTS Enabled (optional, for extra security)
4. Click **Save**

### 3.3 Add Proxy Host for Visitka

**For Subdomain (Recommended):**

1. **Domain Names:** `visitka.yourdomain.com` (or `learning.yourdomain.com`)
2. **Scheme:** `http`
3. **Forward Hostname/IP:** `172.30.4.14`
4. **Forward Port:** `8000`
5. **Cache Assets:** ✅ Enabled
6. **Block Common Exploits:** ✅ Enabled
7. **SSL:** Request Let's Encrypt certificate (same as sitefinal)

**Alternative: Path-based Routing (Same Domain):**

If you prefer `yourdomain.com/visitka`:

1. Edit sitefinal proxy host
2. **Custom Locations** → **Add Location**
   - **Define Location:** `/visitka`
   - **Scheme:** `http`
   - **Forward Hostname/IP:** `172.30.4.14`
   - **Forward Port:** `8000`

### 3.4 Verify NPM Configuration

After configuring:

```bash
# Test via NPM (if using domain):
curl https://yourdomain.com/api/projects/
curl https://visitka.yourdomain.com/

# Or via IP:
curl http://172.30.4.14/api/projects/
```

---

## Step 4: Add Domain (When Ready)

### 4.1 Configure DNS

Point your domain to Nginx Proxy Manager server:

```
A     @              → <npm-server-ip>
A     www            → <npm-server-ip>
A     visitka        → <npm-server-ip>
```

Wait for DNS propagation (5-60 minutes).

### 4.2 Update Environment Variables

```bash
nano .env
```

Update these lines:
```bash
# Add domains to allowed hosts (comma-separated)
DJANGO_ALLOWED_HOSTS=172.30.4.14,yourdomain.com,www.yourdomain.com,visitka.yourdomain.com

# Add HTTPS origins (NPM handles SSL)
DJANGO_CORS_ORIGINS=http://172.30.4.14,https://yourdomain.com,https://www.yourdomain.com
DJANGO_CSRF_TRUSTED_ORIGINS=http://172.30.4.14,https://yourdomain.com,https://www.yourdomain.com,https://visitka.yourdomain.com
```

### 4.3 Redeploy

```bash
./deploy_production.sh
```

### 4.4 Enable HTTPS Security Headers (Recommended)

When using HTTPS via NPM, enable security settings:

**For sitefinal:**
```bash
nano sitefinal/backend/settings.py
```

Find and uncomment:
```python
if DJANGO_ENV != 'local':
    SECURE_SSL_REDIRECT = True  # Uncomment this
    SESSION_COOKIE_SECURE = True  # Uncomment this
    CSRF_COOKIE_SECURE = True  # Uncomment this
```

**For visitka:**
```bash
nano visitka/ll_project/settings.py
```

Find and uncomment:
```python
if not DEBUG:
    SECURE_SSL_REDIRECT = True  # Uncomment this
    SESSION_COOKIE_SECURE = True  # Uncomment this
    CSRF_COOKIE_SECURE = True  # Uncomment this
```

Then redeploy:
```bash
./deploy_production.sh
```

---

## Common Operations

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker logs sitefinal -f
docker logs visitka -f

# Last 100 lines
docker logs --tail=100 sitefinal
```

### Restart Services

```bash
# Restart all
docker-compose restart

# Restart specific
docker-compose restart sitefinal
docker-compose restart visitka

# Full restart (rebuild)
docker-compose down
docker-compose up -d --build
```

### Update Application Code

```bash
# Pull latest code
git pull origin main

# Rebuild and deploy
./deploy_production.sh
```

### Stop Services

```bash
# Stop containers (keep volumes)
docker-compose stop

# Stop and remove containers
docker-compose down

# Stop and remove everything (including volumes)
docker-compose down -v  # ⚠️ This deletes databases!
```

### Database Operations

**Migrations:**
```bash
# After model changes in sitefinal
docker exec sitefinal python manage.py makemigrations
docker exec sitefinal python manage.py migrate

# For visitka
docker exec visitka python manage.py makemigrations
docker exec visitka python manage.py migrate
```

**Django Shell:**
```bash
docker exec -it sitefinal python manage.py shell
docker exec -it visitka python manage.py shell
```

**Database Backup (SQLite):**
```bash
# Backup sitefinal database
docker cp sitefinal:/app/db.sqlite3 ./backups/sitefinal_$(date +%Y%m%d).sqlite3

# Backup visitka database
docker cp visitka:/app/db.sqlite3 ./backups/visitka_$(date +%Y%m%d).sqlite3
```

### Static Files Issues

If static files aren't loading:

```bash
# Rebuild static files
docker exec sitefinal python manage.py collectstatic --noinput --clear
docker exec visitka python manage.py collectstatic --noinput --clear

# Check static directory
docker exec sitefinal ls -la /app/staticfiles/
docker exec visitka ls -la /app/staticfiles/

# Restart containers
docker-compose restart
```

---

## Troubleshooting

### Containers Won't Start

```bash
# Check detailed logs
docker logs sitefinal --tail=100
docker logs visitka --tail=100

# Common issues:
# 1. Missing SECRET_KEY → Check .env file
# 2. Port conflict → Check if ports 8000/8001 are free: netstat -tlnp | grep -E '8000|8001'
# 3. Build errors → Check frontend build: cd sitefinal/new-zakaz && npm run build
```

### 502 Bad Gateway in NPM

**Causes:**
1. Container not running: `docker ps` (should show sitefinal/visitka)
2. Wrong IP/port in NPM: Verify Forward Hostname = `172.30.4.14` and ports `8000`/`8001`
3. Firewall blocking: Check `sudo ufw status` or `iptables -L`
4. Container crashed: Check logs `docker logs sitefinal`

**Solutions:**
```bash
# Restart containers
docker-compose restart

# Check if ports are accessible from NPM server
telnet 172.30.4.14 8001
telnet 172.30.4.14 8000

# Check ZeroTier connection
sudo zerotier-cli listnetworks
ping 172.30.4.14
```

### CORS Errors in Browser

**Symptoms:** Console shows "CORS policy" errors

**Fix:**
```bash
# 1. Ensure domain is in .env
nano .env
# Add domain to DJANGO_CORS_ORIGINS and DJANGO_CSRF_TRUSTED_ORIGINS

# 2. Redeploy
./deploy_production.sh

# 3. Verify NPM forwards headers correctly
# In NPM → Advanced tab, add:
# proxy_set_header X-Forwarded-Proto $scheme;
```

### SSL Certificate Errors in NPM

**Common issues:**
1. DNS not propagated → Wait or check: `dig yourdomain.com`
2. Port 80/443 not accessible → Check firewall on NPM server
3. Rate limit → Let's Encrypt has limits (5 certs/week per domain)
4. Domain validation failed → Ensure domain points to NPM server IP

**Solutions:**
```bash
# Check DNS resolution
dig yourdomain.com +short
# Should return NPM server IP

# Test port 80 accessibility from outside
curl -I http://yourdomain.com/.well-known/acme-challenge/test

# Check NPM logs
docker logs nginx-proxy-manager -f
```

### Static Files Not Loading (404)

```bash
# 1. Rebuild frontend
cd sitefinal/new-zakaz
npm run build

# 2. Copy to Django
cp sitefinal/new-zakaz/dist/index.html sitefinal/templates/
cp -r sitefinal/new-zakaz/dist/assets/* sitefinal/static/assets/

# 3. Collect static in container
docker exec sitefinal python manage.py collectstatic --noinput

# 4. Restart
docker-compose restart sitefinal
```

### Database Migration Errors

```bash
# Check migration status
docker exec sitefinal python manage.py showmigrations

# Fix: Fake migrations if needed (⚠️ careful!)
docker exec sitefinal python manage.py migrate --fake

# Or: Reset migrations (⚠️ DATA LOSS!)
# Backup first!
docker exec sitefinal python manage.py migrate donations zero
docker exec sitefinal python manage.py migrate
```

---

## Security Checklist

Before going live:

- [ ] `SECRET_KEY` and `VISITKA_SECRET_KEY` changed from defaults
- [ ] `DJANGO_DEBUG=0` in `.env`
- [ ] `ALLOWED_HOSTS` restricted to actual IP/domains (no `*`)
- [ ] CORS origins properly configured (no `CORS_ALLOW_ALL_ORIGINS=True` in prod)
- [ ] CSRF trusted origins configured
- [ ] SSL certificates installed and working
- [ ] HTTPS redirect enabled in NPM
- [ ] `SECURE_SSL_REDIRECT=True` uncommented in settings (when using HTTPS)
- [ ] Admin passwords are strong
- [ ] Database backed up
- [ ] Firewall configured (only necessary ports open)
- [ ] ZeroTier network members authorized in ZT Central
- [ ] NPM access restricted (change default password!)

**Additional hardening:**
```bash
# Limit admin access by IP in NPM
# Add Access List in NPM:
# - Allow: Your IP
# - Deny: All others

# Fail2ban for brute force protection
sudo apt-get install fail2ban
```

---

## Monitoring & Maintenance

### Container Health Check

```bash
# Check resource usage
docker stats

# Check disk space
df -h
docker system df

# Clean up unused images/volumes
docker system prune -a --volumes
```

### Application Health Monitoring

```bash
# Sitefinal API health
curl -I http://172.30.4.14:8001/api/projects/
# Should return 200 OK

# Visitka health
curl -I http://172.30.4.14:8000/
# Should return 200 OK

# Check response time
curl -w "@-" -o /dev/null -s http://172.30.4.14:8001/api/projects/ <<EOF
time_total: %{time_total}s\n
EOF
```

### Log Rotation

Prevent logs from filling disk:

```bash
# Configure Docker log rotation
sudo nano /etc/docker/daemon.json
```

Add:
```json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  }
}
```

Restart Docker:
```bash
sudo systemctl restart docker
docker-compose up -d
```

### Backup Strategy

**Automated daily backup script:**

```bash
nano /opt/backup.sh
```

```bash
#!/bin/bash
BACKUP_DIR=/opt/backups
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

# Backup databases
docker cp sitefinal:/app/db.sqlite3 $BACKUP_DIR/sitefinal_$DATE.sqlite3
docker cp visitka:/app/db.sqlite3 $BACKUP_DIR/visitka_$DATE.sqlite3

# Backup media files
docker cp sitefinal:/app/media $BACKUP_DIR/media_$DATE

# Keep only last 7 days
find $BACKUP_DIR -mtime +7 -delete

echo "Backup completed: $DATE"
```

```bash
chmod +x /opt/backup.sh

# Add to crontab (daily at 2 AM)
crontab -e
# Add line:
0 2 * * * /opt/backup.sh >> /var/log/backup.log 2>&1
```

---

## Performance Optimization

### For Production Scale:

**1. Gunicorn Workers**

Edit `sitefinal/entrypoint.sh` and `visitka/entrypoint.sh`:

```bash
# Change from:
gunicorn backend.wsgi:application --bind 0.0.0.0:8001

# To (4 workers for 2 CPU cores):
gunicorn backend.wsgi:application \
  --bind 0.0.0.0:8001 \
  --workers 4 \
  --worker-class sync \
  --timeout 120 \
  --access-logfile - \
  --error-logfile -
```

**2. PostgreSQL Instead of SQLite**

For higher traffic:

```bash
# docker-compose.yml - add service:
postgres:
  image: postgres:15-alpine
  environment:
    POSTGRES_DB: sitefinal_db
    POSTGRES_USER: sitefinal
    POSTGRES_PASSWORD: ${DB_PASSWORD}
  volumes:
    - postgres_data:/var/lib/postgresql/data

# Update .env:
DATABASE_ENGINE=postgresql
DATABASE_NAME=sitefinal_db
DATABASE_USER=sitefinal
DATABASE_PASSWORD=secure_password
DATABASE_HOST=postgres
DATABASE_PORT=5432
```

**3. Redis for Caching**

```bash
# Add to docker-compose.yml:
redis:
  image: redis:7-alpine
  volumes:
    - redis_data:/data

# Update settings.py:
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.redis.RedisCache',
        'LOCATION': 'redis://redis:6379/1',
    }
}
```

---

## Alternative: Beget Hosting

If deploying to Beget instead of self-hosted:

See detailed instructions in:
- `sitefinal/README_BEGET.md`
- `sitefinal/deploy_beget.sh`
- `sitefinal/beget_env_production.txt`

Key differences:
- No Docker
- MySQL instead of SQLite
- WSGI configuration in Beget panel
- Static files served by Beget

---

## Support & Resources

**Documentation in this repository:**
- `README.md` - General overview
- `CLAUDE.md` - Development guide
- `AGENTS.md` - Coding conventions
- `sitefinal/README_BEGET.md` - Alternative hosting

**External resources:**
- [Django Deployment Checklist](https://docs.djangoproject.com/en/stable/howto/deployment/checklist/)
- [Nginx Proxy Manager Docs](https://nginxproxymanager.com/guide/)
- [ZeroTier Documentation](https://docs.zerotier.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)

**Getting help:**
```bash
# Django logs
docker exec sitefinal python manage.py check --deploy

# Container shell access
docker exec -it sitefinal /bin/bash
docker exec -it visitka /bin/bash

# Database shell
docker exec -it sitefinal python manage.py dbshell
```

---

## Summary of Files Changed for Production

Production deployment modified these key files:

1. **`.env.production`** - Template for environment variables
2. **`docker-compose.yml`** - Production-ready configuration
3. **`deploy_production.sh`** - Automated deployment script
4. **`sitefinal/backend/settings.py`** - Added NPM proxy support
5. **`visitka/ll_project/settings.py`** - Added NPM proxy support
6. **`CLAUDE_PRODUCTION.md`** - This guide

No other code changes needed - the project is production-ready!
