# syntax=docker/dockerfile:1
FROM python:3.12-slim AS visitka

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential gosu \
 && rm -rf /var/lib/apt/lists/*

COPY requirements.txt /app/requirements.txt
RUN pip install --upgrade pip && pip install -r /app/requirements.txt

COPY . /app

# подготовим entrypoint как root
# подготовим entrypoint как root
COPY --chmod=0755 entrypoint.sh /usr/local/bin/entrypoint.sh
# нормализуем CRLF -> LF и сохраняем права
RUN sed -i 's/\r$//' /usr/local/bin/entrypoint.sh \
 && chmod 0755 /usr/local/bin/entrypoint.sh

# теперь понижаем привилегии
RUN useradd -m appuser && chown -R appuser:appuser /app
ENV APP_USER=appuser

ENV DJANGO_SETTINGS_MODULE=ll_project.settings
EXPOSE 8000
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
