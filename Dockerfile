FROM python:alpine3.7
LABEL MAINTAINER="Haseeb Majid hello@haseebmajid.dev"

COPY dist ./dist/
RUN pip install dist/*
