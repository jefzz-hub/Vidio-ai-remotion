FROM mcr.microsoft.com/devcontainers/javascript-node:1-22-bookworm
USER root
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
 ffmpeg ca-certificates libnss3 libdbus-1-3 libatk1.0-0 libgbm1 libasound2 libxrandr2 libxkbcommon0 \
 libxfixes3 libxcomposite1 libxdamage1 libatk-bridge2.0-0 libpango-1.0-0 libcairo2 libcups2 \
 libglib2.0-0 libgtk-3-0 fonts-dejavu-core && rm -rf /var/lib/apt/lists/*
USER node
