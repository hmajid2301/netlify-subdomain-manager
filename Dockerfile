FROM node:14.1.0-alpine3.10

LABEL maintainer="Haseeb Majid<hello@haseebmajid.dev>"
LABEL VERSION="0.1.4"

ENV NETLIFY_ACCESS_TOKEN=""
ENV NETLIFY_SUBDOMAIN_FILE="./subdomains.json"
ENV NETLIFY_MAIN_DOMAIN=""
ENV NETLIFY_SITE_ID=""

WORKDIR /app
COPY lib/index.js package*.json ./

RUN  npm install --only=prod

ENTRYPOINT [ "node", "/app/index.js" ]