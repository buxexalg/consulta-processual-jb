FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY prisma ./prisma/

COPY . .

EXPOSE 4000

#RUN npx prisma db push
#RUN npm run prisma:seed

CMD ["npm", "run", "start:dev"]