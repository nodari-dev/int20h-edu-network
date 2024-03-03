FROM node:20 AS build-env

WORKDIR /app

COPY . .

ENV VITE_BASE_URL=https://jwp-team.com/backend/api

RUN npm install && npm run build

FROM nginx:1.25.4-alpine3.18 AS runtime-env

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder-env /app/dist .
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]