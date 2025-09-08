FROM node:20-slim

WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY package*.json ./
RUN pnpm install

COPY . .

ENV HOST 0.0.0.0
ENV PORT 3000

EXPOSE 3000

CMD ["npm", "run", "dev"]
