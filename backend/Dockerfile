FROM node:lts-alpine3.21 AS builder

WORKDIR /app

COPY package*.json .

RUN npm install --omit-dev

COPY . .

RUN npm run build

FROM gcr.io/distroless/nodejs22-debian12

ENV PORT=8080

EXPOSE ${PORT}

COPY --from=builder  /app/node_modules /app/node_modules
COPY --from=builder /app/dist/ /app/dist

CMD ["/app/dist/src/index.js"]
