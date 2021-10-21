FROM node:14-alpine AS build
# Caso seja necessário o uso de dependências que necessitem de build, descomentar o código abaixo
# RUN apk add --no-cache alpine-sdk python3
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm ci --dev
COPY . /app/
RUN npx tsc

FROM node:14-alpine
# Caso seja necessário o uso de dependências que necessitem de build, descomentar o código abaixo
# RUN apk add --no-cache alpine-sdk python3
ENV NODE_ENV production
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm ci --prod
COPY --from=build /app/build/ /app/
COPY ormconfig.js /app/
CMD ["node", "--async-stack-traces", "--inspect", "-r", "source-map-support/register", "/app/src/server.js"]
