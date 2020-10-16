# Sticky Notes Application

This web app integrates a React.js as frontend and Express.js framework with a MongoDB database as backend. All has been compose in Docker-compose.

Sticky Notes was build as a Responsive Single Page Application so it manages desktop, tablet and mobile widths and it can be easy to scaled it.

Currently the backend works with RestAPIs endpoints as get, update, delete for being consumed on the frontend and perform corresponding note taskes. They are just a few due to the free database storage capacity provided by MongoDB.

For Frontend components modified, I used a open library that I did with others team workers when I used to work at The Ksquare Group, you can find it in npm website by the name zanma-react-components. It also was built on Storybook using React.js, Typescript, Css and Javascript.

## Next versions:

- Implementation users database and an authentication to users Log in.

- Addition of style for main layout page.

## Technology stack used:

Frontend: React js, Typescript, Styled-components and a library called Zanma-react-components. Used Yarn as a package manager.

Backend: Express, nodemon, Mongoose, body-parser, dotenv and MongoDB. Used NPM as a package manager.

DevOps: Docker-compose.

## Installation and running:

Pretty much everything you need to install after cloning repository are the technology stack mentioned before, and all aplication runs on root folder `sticky_notes` by typing the command `docker-compose up`.

To run the app you have to install docker in your computer also and build the images first by typing the command `docker-composeup --build`. Or if you dont want to do this you can run the entire app by installing Concurrently and editing the sticky_notes_backend package.json like this on the script section:

`... { "scripts": { "dev": "nodemon app.js", "client": "cd .. && cd sticky_notes_frontend && yarn start", "start": "concurrently \"npm run dev\" \"npm run client\"" }, ...`

And like this on the sticky_notes_frontend package.json:

`... "name": "sticky_notes_frontend", "version": "0.1.0", "private": true, "proxy": "http://localhost:3001", "dependencies": { ...`

Therefore you can run the entire app by getting into sticky_notes_backend folder and typing the command `npm start`.

## Also:

There's a version of this same app using Concurrently by Node.js that I have with me, so for any doubts or information, contact me.

To get separate parts of the project as the frontend and backend you can find them on my github repository page under the following names:

- Frontend: sticky_notes_app (older version that what appears in this app)
- Backend: be_test (similar version of what appears in this app)

<pr/>
Regards,

Alexa Dominguez
