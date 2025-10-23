# syntax=docker/dockerfile:1
FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential default-libmysqlclient-dev pkg-config gosu \
 && rm -rf /var/lib/apt/lists/*

COPY requirements.txt /app/requirements.txt
RUN pip install --upgrade pip && pip install -r /app/requirements.txt

COPY . /app
# ===================================
# === готовим entrypoint как root ===
COPY --chmod=0755 entrypoint.sh /entrypoint.sh
RUN sed -i 's/\r$//' /entrypoint.sh \
 && chmod 0755 /entrypoint.sh
# ===================================

# теперь понижаем привилегии
RUN useradd -m appuser && chown -R appuser:appuser /app
ENV APP_USER=appuser

ENV DJANGO_SETTINGS_MODULE=backend.settings
EXPOSE 8001
ENTRYPOINT ["/entrypoint.sh"]
