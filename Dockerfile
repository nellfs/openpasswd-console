FROM node:16-alpine as build
WORKDIR /app
COPY package.json ./
RUN npm install -g npm@8.7.0 && \
    npm install --only=production
COPY . ./
RUN npm run build

# production environment
FROM nginx:1.21-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
