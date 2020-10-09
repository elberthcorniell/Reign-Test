FROM node:14
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN cd /usr/src/app && npm install
COPY . .
EXPOSE 3001
CMD ["npm", "start"]