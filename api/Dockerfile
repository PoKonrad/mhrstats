FROM node:18.6.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 8000

CMD [ "node", "index.js" ]
