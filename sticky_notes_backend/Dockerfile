FROM node:12.13.1

RUN mkdir -p /usr/src/app-backend

WORKDIR /usr/src/app-backend

COPY package.json /usr/src/app-backend
COPY package-lock.json /usr/src/app-backend

RUN npm install

COPY . /usr/src/app-backend

CMD [ "npm", "start" ]
