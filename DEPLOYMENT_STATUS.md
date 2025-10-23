# Deployment Status

**Status:** ✅ Ready for Production Deployment

**Last Updated:** 2025-10-23

---

## Current Configuration

### Services Running
- ✅ **sitefinal** - Django REST API + React SPA (port 8001)
- ✅ **visitka** - Django template app (port 8000)

### Database
- **Type:** SQLite (default)
- **Location:** Docker volumes `sitefinal_db` and `visitka_db`
- **Migration to MySQL:** Available but optional (see CLAUDE_PRODUCTION.md)

### Environment
- **Mode:** Production (`DJANGO_ENV=production`, `DJANGO_DEBUG=0`)
- **IP:** Configured for `172.30.4.14`
- **Domain:** Ready for configuration via Nginx Proxy Manager

---

## Test Results

### Sitefinal (Port 8001)
```bash
$ curl http://localhost:8001/api/projects/
[{"id":1,"slug":"svo-family","title":"«МЫ СВОИ»"...}]
✅ API working correctly
```

### Visitka (Port 8000)
```bash
$ curl -I http://localhost:8000/
HTTP/1.1 200 OK
✅ Application responding
```

### Containers
```bash
$ docker ps
sitefinal   Up   0.0.0.0:8001->8001/tcp
visitka     Up   0.0.0.0:8000->8000/tcp
✅ Both containers running with Gunicorn
```

---

## Files Created/Modified

### New Files
1. **`.env.production`** - Production environment template
2. **`.env`** - Active environment configuration (not in git)
3. **`deploy_production.sh`** - Automated deployment script
4. **`CLAUDE_PRODUCTION.md`** - Complete deployment guide
5. **`DEPLOYMENT_STATUS.md`** - This file

### Modified Files
1. **`docker-compose.yml`** - Production-ready configuration
2. **`sitefinal/backend/settings.py`** - Fixed database logic, NPM proxy support
3. **`visitka/ll_project/settings.py`** - Added WhiteNoise, NPM proxy support
4. **`CLAUDE.md`** - Development guide with production reference

---

## Issue Fixed

**Problem:** `django.db.utils.OperationalError: Can't connect to local server through socket '/run/mysqld/mysqld.sock'`

**Root Cause:** Settings were forcing MySQL connection when `DJANGO_ENV=production`, but MySQL wasn't configured.

**Solution:** Changed database configuration logic in `sitefinal/backend/settings.py`:
- Now uses SQLite by default
- Only uses MySQL if `MYSQL_DATABASE` environment variable is explicitly set
- Works in both development and production without MySQL

**Code Change:**
```python
# Before: Force MySQL in production
if DJANGO_ENV == 'local':
    # Use SQLite
else:
    # Use MySQL (ERROR if not configured!)

# After: Smart detection
if os.getenv('MYSQL_DATABASE'):
    # Use MySQL only if configured
else:
    # Use SQLite (safe default)
```

---

## Next Steps

### For Local Testing
Deployment is complete and working on `localhost:8001` and `localhost:8000`.

### For Production on 172.30.4.14

1. **Deploy to Server:**
   ```bash
   # On server 172.30.4.14
   git clone <repo-url> /opt/sites_ranodom_studens
   cd /opt/sites_ranodom_studens
   cp .env.production .env
   nano .env  # Add SECRET_KEY values
   ./deploy_production.sh
   ```

2. **Configure Nginx Proxy Manager:**
   - Access NPM at `http://<npm-ip>:81`
   - Add proxy host: `172.30.4.14` → `172.30.4.14:8001` (sitefinal)
   - Add proxy host: `visitka.domain.com` → `172.30.4.14:8000` (visitka)

3. **Add Domain (Optional):**
   - Point DNS to NPM server
   - Update `.env` with domain names
   - Request SSL certificate in NPM
   - Redeploy: `./deploy_production.sh`

**Full instructions:** See `CLAUDE_PRODUCTION.md`

---

## Security Checklist

Before going live:

- [ ] Change `SECRET_KEY` and `VISITKA_SECRET_KEY` in `.env` (currently using test keys)
- [ ] Update `ALLOWED_HOSTS` with actual domain
- [ ] Configure CORS origins for production domain
- [ ] Enable HTTPS security headers (when using SSL)
- [ ] Create strong admin passwords
- [ ] Set up regular database backups
- [ ] Configure ZeroTier access control
- [ ] Secure Nginx Proxy Manager access

---

## Quick Commands

```bash
# View logs
docker-compose logs -f

# Restart services
docker-compose restart

# Update code and redeploy
git pull && ./deploy_production.sh

# Create admin user
docker exec -it sitefinal python manage.py createsuperuser
docker exec -it visitka python manage.py createsuperuser

# Stop services
docker-compose down

# Backup database
docker cp sitefinal:/app/db.sqlite3 ./backup_sitefinal.db
docker cp visitka:/app/db.sqlite3 ./backup_visitka.db
```

---

## Documentation

- **Development:** `CLAUDE.md`
- **Production:** `CLAUDE_PRODUCTION.md`
- **Coding:** `AGENTS.md`
- **Status:** `DEPLOYMENT_STATUS.md` (this file)
