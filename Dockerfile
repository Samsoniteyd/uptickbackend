FROM node:alpine

COPY package.json /app/
COPY . .
COPY src/ .

WORKDIR /app


RUN npm install

CMD ["node", "server.ts" ]
