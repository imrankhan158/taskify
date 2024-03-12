FROM node:20-alpine as BUILD_IMAGE
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm i

COPY ./ ./

RUN npm run build

# Stage 2: Production Stage
FROM node:20-alpine

COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /app/dist ./dist

CMD ["node", "./dist/server.cjs"]