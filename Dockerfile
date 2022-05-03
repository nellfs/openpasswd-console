FROM node:16-alpine as build
WORKDIR /app
COPY package.json ./
RUN npm install -g npm@8.7.0 && \
    npm install
COPY . ./
RUN npm run build

# production environment
FROM nginx:1.21-alpine
RUN rm /docker-entrypoint.d/*
COPY ./docker/entrypoint/openpasswd_server.sh /docker-entrypoint.d/openpasswd_server.sh
COPY ./docker/nginx/default.conf /etc/nginx/conf.d/default.conf
RUN chmod +x /docker-entrypoint.d/openpasswd_server.sh
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
