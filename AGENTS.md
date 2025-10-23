# Repository Guidelines

## Project Structure & Module Organization
- Root `docker-compose.yml` runs `sitefinal` (Django + React) and `visitka` (learning-logs Django).
- `sitefinal/backend` stores project settings; apps like `donations/` keep models, serializers, views, and shared assets in `static/` and `templates/`.
- The Vite frontend lives in `sitefinal/new-zakaz/src` with builds in `dist/`.
- `visitka/ll_project` hosts settings; `learning_logs/` and `users/` contain app logic, templates, and static files.

## Build, Test, and Development Commands
- Backend setup: `cd sitefinal && python -m venv venv && source venv/bin/activate && pip install -r requirements.txt`.
- Run API: `python manage.py migrate && python manage.py runserver 0.0.0.0:8001`.
- Frontend: `cd sitefinal/new-zakaz && npm install && npm run dev`; use `npm run build` for production and `npm run lint` for checks.
- Visitka: `cd visitka && python -m venv venv && source venv/bin/activate && pip install -r requirements.txt && python manage.py runserver 0.0.0.0:8000`.
- Full stack: from the repo root run `docker-compose up --build`.

## Coding Style & Naming Conventions
- Python: follow PEP 8, four-space indents, `snake_case` functions, and `PascalCase` models/forms; keep settings inside `backend/settings.py`.
- Order imports `stdlib → third-party → local` and keep serializers, viewsets, and urls within their app folder.
- TypeScript React: follow `eslint.config.js`, name components `PascalCase.tsx`, hooks `useSomething.ts`, and prefer typed functional components.

## Testing Guidelines
- Use Django `TestCase`; extend each app’s `tests.py` and run targeted suites (`python manage.py test donations`, `python manage.py test learning_logs`).
- Cover core flows (donation lifecycle, account management, public pages) and document fixtures near the tests.
- The frontend currently lacks automated tests; run `npm run lint` before PRs and add Vitest or UI checks when introducing complex logic.

## Commit & Pull Request Guidelines
- Git history is unavailable in this snapshot; adopt Conventional Commits (`feat: add donation API`) for clarity going forward.
- Keep commits focused and include migrations alongside related code, noting schema changes in the PR body.
- PRs should outline purpose, list required env keys (`GEMINI_API_KEY`, `DJANGO_DEBUG`), link issues, and attach UI screenshots when relevant.
- List manual verification steps (commands above) so reviewers can replay your checks.

## Security & Configuration Tips
- Store secrets in `.env`, `.env.local`, or Beget templates (`beget_env_example.txt`, `visitka/.env`); never commit real keys.
- Deploy with `DJANGO_DEBUG=0`, correct `ALLOWED_HOSTS`, and run `python manage.py collectstatic --noinput`.
- Review `deploy_beget.sh` and `deploy_production.sh` before execution and align host targets with your environment.
