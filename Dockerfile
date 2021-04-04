FROM node:15-alpine AS builder

WORKDIR /app

COPY . /app

RUN npm install && npm run build

FROM node:15-alpine

WORKDIR /app

COPY --from=builder /app/build /app/build

RUN npm install -g serve

CMD serve -s build
