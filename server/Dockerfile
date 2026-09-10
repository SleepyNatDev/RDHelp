FROM node:lts-alpine AS node

WORKDIR /app

COPY ./ ./
COPY ./ ./
RUN npm install

EXPOSE 8181

CMD ["node", "server.js"]