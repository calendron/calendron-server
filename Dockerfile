FROM node:20-alpine

WORKDIR /app

COPY package*.json /app

RUN npm install


COPY . .

RUN npm run build

RUN npm install -g typescript

CMD ["npm", "run", "start"]