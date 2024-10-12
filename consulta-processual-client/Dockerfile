FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4000

RUN npx prisma db push
##RUN npm run prisma:seed

CMD ["npm", "run", "start:dev"]