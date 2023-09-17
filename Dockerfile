FROM node:18

WORKDIR /app
COPY package.json package-lock.json /app/

RUN npm i

COPY . /app
