FROM node:12.18.4-alpine
WORKDIR /app

COPY package.json /app
RUN npm install
COPY . ./
CMD ["npm", "start"]
