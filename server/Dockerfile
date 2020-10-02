FROM node:12.18.4-alpine
WORKDIR /app

COPY package.json /app
RUN npm install
RUN npm install -g nodemon
COPY . ./
CMD ["node", "app.js"]
