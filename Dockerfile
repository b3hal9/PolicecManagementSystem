FROM node:16.13.1-alpine3.14
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
ENV DATA_URL = 
EXPOSE 3000
CMD [ "npm","start"]

