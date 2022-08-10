FROM node:14-alpine

WORKDIR /usr/server

RUN apk add --no-cache g++

COPY ./package.json ./
RUN npm install
COPY ./ ./

# default command
CMD [ "npm","start" ]