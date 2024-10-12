FROM node:18-alpine AS base

COPY . /src
WORKDIR /src

FROM base as dev 
ENV NODE_ENV=developement
RUN npm install

CMD ["npm", "run", "dev"]