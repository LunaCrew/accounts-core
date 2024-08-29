FROM node:20-alpine
WORKDIR /

COPY package*.json ./
RUN npm i -g typescript tsconfig-paths && npm i --production --ignore-scripts
COPY . .

RUN npm run build

EXPOSE 8080
CMD [ "npm", "start" ]