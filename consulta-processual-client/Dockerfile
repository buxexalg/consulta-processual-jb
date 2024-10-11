FROM node:18

WORKDIR /

COPY package*.json ./
COPY ./prisma ./prisma

RUN npm install

COPY . .

EXPOSE 4000

RUN npx prisma db push
RUN npm run prisma:seed

CMD ["npm", "run", "start:prod"]