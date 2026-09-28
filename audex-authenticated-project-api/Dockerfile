#  Build Stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

#  Production Stage
FROM node:18-alpine AS runner

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY healthcheck.js ./

EXPOSE 5000

CMD ["node", "dist/index.js"]