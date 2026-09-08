FROM node:lts-alpine AS angular

WORKDIR /app

COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.31.5 AS nginx

WORKDIR /usr/share/nginx/html
COPY --from=angular /app/dist/RDHelp/browser .
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080