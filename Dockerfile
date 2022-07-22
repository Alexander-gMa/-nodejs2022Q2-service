FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE ${PORT}

CMD ["npm", "run", "start:dev"]