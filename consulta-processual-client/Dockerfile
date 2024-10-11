FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm run build

ARG DATABASE_URL
ENV DATABASE_URL "postgresql://postgres:postgres@localhost:5432/consulta-processual?schema=public"

EXPOSE 4000

RUN npx prisma db push
RUN npm run prisma:seed

CMD ["npm", "run", "start:dev"]