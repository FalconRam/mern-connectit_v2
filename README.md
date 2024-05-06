## ConnectIT

Context - A Fullstack Mock Social Media platform with added features of below and fully responsive to All screens

> Stack Used

1.  Languages

- Javascript

2.  Frontend

- ReactJs, Redux, Bootstrap

3.  Backend

- NodeJs Based ExpressJs server
- JsonWebToken, Nodemailer
- Database - MongoDB

4.  Deployments

- Frontend deployed on _Vercel_
- Backend on _AWS EC2 Instance_ along with _CI/CD_ Pipeline.
- Post Images are hosted _Cloudinary CDN_

_Live URL: https://connectit.ramvh.in/_

> This project contains below features,

- Create an Account/Login and also Explore with a Test account on the login page or landing page.
- Create a Post with content like Instagram, or Facebook.
- Like, Save, Comment, Reply to Comment/Reply (Nested Comments), and Share Posts to other Apps (In Mobile).
- Edit Post, Profile Details.
- It has Forgot Password, which will send a Password Reset link to User email.
- Redirect functionality to a specific page, after login, for seamless usage.

> Steps to set up the project Locally,

1. Clone the Repo

- `git clone https://github.com/FalconRam/mern-connectit_v2.git`

2. Initialize Client

- `cd client`
- `npm install`
- add .env file
- `npm start`

3. Initialize Server

- open a new terminal
- `cd server`
- `npm install`
- add .env file
- `npx nodemon server.js` or `nodemon server.js` or `node server.js`
