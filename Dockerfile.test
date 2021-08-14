# syntax=docker/dockerfile:1

FROM node:14.17.4
ENV NODE_ENV=test
WORKDIR /code
COPY ["package.json", "package-lock.json*", "./"]
RUN npm ci
COPY . .
CMD [ "npm", "run", "test"]