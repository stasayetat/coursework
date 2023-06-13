FROM node:20-alpine3.17

COPY . /app

WORKDIR /app/server

RUN npm install
RUN npm install -g typescript
RUN tsc

CMD ["node", "./dist/server.js"]