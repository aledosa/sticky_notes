FROM node:12.13.1

RUN mkdir -p /usr/src/app-frontend

WORKDIR /usr/src/app-frontend

COPY package.json /usr/src/app-frontend
COPY yarn.lock /usr/src/app-frontend

RUN yarn install

COPY . /usr/src/app-frontend

CMD [ "yarn", "start" ]
