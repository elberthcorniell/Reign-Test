FROM node:14
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN cd /usr/src/app && npm install --also=dev
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]