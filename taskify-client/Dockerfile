# Stage 1: Build Stage
FROM node:20-alpine as BUILD_IMAGE
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build


# Stage 2: Production Stage
FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html
COPY --from=BUILD_IMAGE /app/dist .
COPY nginx-conf/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
