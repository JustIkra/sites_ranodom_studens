# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a multi-project repository containing two Django applications:
- **sitefinal**: Django REST API backend + Vite React TypeScript frontend for a donation platform
- **visitka**: Traditional Django app (learning-logs) with template-based rendering

Both can be run via `docker-compose up --build` or independently.

## Development Commands

### Full Stack (Docker)
```bash
docker-compose up --build
```
- `sitefinal` runs on port 8001
- `visitka` runs on port 8000

### sitefinal - Django API Backend
```bash
cd sitefinal
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 0.0.0.0:8001
```

**Run specific app tests:**
```bash
python manage.py test donations
```

### sitefinal - React Frontend
```bash
cd sitefinal/new-zakaz
npm install
npm run dev      # Development server
npm run build    # Production build (TypeScript check + Vite build)
npm run lint     # ESLint
```

Note: Uses `rolldown-vite` package override instead of standard Vite.

### visitka - Django App
```bash
cd visitka
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

**Run specific app tests:**
```bash
python manage.py test learning_logs
python manage.py test users
```

## Architecture

### sitefinal Structure

**Backend (Django):**
- `backend/`: Project settings, main `urls.py` with DRF router setup
- `donations/`: Main app containing models (Project, Donation), serializers, viewsets
- Root URL serves React build via `TemplateView` for SPA
- API endpoints mounted at `/api/` using DRF DefaultRouter
- Static images served from `static/images/` in development

**Frontend (Vite + React):**
- Located in `sitefinal/new-zakaz/src/`
- `components/`: Reusable UI components (Header, Footer, ProjectCard, DonationWidget, etc.)
- `pages/`: Page-level components (MainPage, ProjectPage, SponsorsPage, etc.)
- `constants.tsx`: Large constants file (likely contains project data)
- `App.tsx`: Main application component
- Build output goes to `dist/` which Django serves in production

**Data Flow:**
1. React frontend fetches from `/api/projects/` and `/api/donations/` endpoints
2. Django REST Framework viewsets handle API logic
3. Static assets and images served separately

### visitka Structure

Traditional Django MVC app:
- `ll_project/`: Project settings and main URLs
- `learning_logs/`: Core app with models, forms, views, templates
- `users/`: User management app
- Root path (`/`) routes to `learning_logs`
- User auth routes at `/users/`

## Environment Configuration

Both apps use environment variables for configuration:

**Required variables:**
- `DJANGO_DEBUG`: Set to 0 for production
- `DJANGO_ALLOWED_HOSTS`: Comma-separated host list
- `SECRET_KEY` (sitefinal) / `DJANGO_SECRET_KEY` (visitka): Django secret key
- `GEMINI_API_KEY`: Required for AI Studio integration in frontend

**Configuration files:**
- `beget_env_example.txt`, `beget_env_production.txt`: Beget hosting config templates
- `.env.local` (frontend): Local frontend environment variables

Never commit actual secrets. Use `.gitignore`d `.env` files.

## Deployment

**Scripts available:**
- `deploy_beget.sh`: Deploy to Beget hosting
- `deploy_production.sh`: Production deployment script

Before deploying:
1. Set `DJANGO_DEBUG=0`
2. Configure correct `ALLOWED_HOSTS`
3. Run `python manage.py collectstatic --noinput`
4. Review and align deployment script with your target environment

For a full production checklist (IP 172.30.4.14 and later domain binding, nginx/SSL), see `CLAUDE_PRODUCTION.md`.

## Code Style

**Python (PEP 8):**
- 4-space indentation
- `snake_case` for functions/variables
- `PascalCase` for models/forms/classes
- Import order: stdlib → third-party → local
- Settings in `backend/settings.py` or `ll_project/settings.py`
- Keep serializers, viewsets, and URLs within their respective app folders

**TypeScript/React:**
- Follow `eslint.config.js` rules
- `PascalCase.tsx` for components
- `useSomething.ts` for hooks
- Typed functional components preferred

**Testing:**
- Use Django `TestCase` in each app's `tests.py`
- Cover core flows (donation lifecycle, auth, public pages)
- Frontend currently lacks automated tests; run `npm run lint` before PRs

## Migrations

When modifying models:
1. Create migrations: `python manage.py makemigrations`
2. Apply: `python manage.py migrate`
3. Include migration files in commits
4. Note schema changes in commit/PR messages

## Django Apps Overview

**sitefinal/donations:**
- Models: Project, Donation
- REST API via viewsets
- Shared static assets in `static/` and `templates/`

**visitka/learning_logs:**
- Traditional Django app with forms and template rendering
- Topic/entry tracking functionality

**visitka/users:**
- User authentication and account management
