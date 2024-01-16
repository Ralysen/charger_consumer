FROM  node:20.10.0-bullseye-slim as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx tsc


FROM node:20.10.0-bullseye-slim

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

COPY package*.json ./

RUN npm ci

ENV NODE_ENV production

USER node

COPY --from=build /usr/src/app/dist ./dist

CMD ["dumb-init", "node", "dist/index"]
