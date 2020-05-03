FROM node:14.1.0-alpine3.10

LABEL maintainer="Haseeb Majid<hello@haseebmajid.dev>"
LABEL VERSION="0.1.0"

ENV NETLIFY_ACCESS_TOKEN=""
ENV NETLIFY_SUBDOMAIN_FILE="subdomain.json"
ENV NETLIFY_MAIN_DOMAIN=""
ENV NETLIFY_SITE_ID=""

WORKDIR /app
COPY lib/index.js package*.json ./

RUN apk add nodejs npm && \
    npm install --only=prod

ENTRYPOINT [ "node", "/app/index.js" ]