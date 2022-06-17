# syntax=docker/dockerfile:1
FROM node:16.15.1-bullseye
RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

FROM httpd:2.4.54-alpine3.16
COPY --from=0 /app/docs/ /usr/local/apache2/htdocs/

