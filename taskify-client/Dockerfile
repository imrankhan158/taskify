FROM node:alpine3.18
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm i

COPY ./ ./

CMD ["npm", "run", "start"]

EXPOSE 5000