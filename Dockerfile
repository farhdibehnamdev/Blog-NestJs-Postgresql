FROM node:22.3.0-alpine3.20

WORKDIR /usr/blog

RUN apk add --no-cache openssl

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install pnpm -g; \
    pnpm install

COPY . ./


CMD ["npm","run","start"]
