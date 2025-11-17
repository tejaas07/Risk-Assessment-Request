FROM node:lts-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Allow port override via environment variable
ARG PORT=8085
ENV PORT=$PORT
EXPOSE $PORT

CMD ["npm", "run", "start"]
