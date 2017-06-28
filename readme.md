## SPA CMS

---

**Note: This is an ongoing project. My initial aim is to set up important functionality.**

I started this project to learn MEAN stack and to also give life to the idea of having my own personal CMS. This is the first project that I have built using ES6 and the new component architecture introduced by Angular 1.5

If you are someone who is interested in learning MEAN stack, then you can use my project as the stepping stone.

Below is the process of setting up the project on your local machine.

List of tools required to be present globally on your machine

* Node
* MongoDb
* NPM
* Yarn
* Postman

Once you have the tools ready. Follow the next steps in the exact order

1. `yarn install`
2. Run the mongod instance on your machine
3. export PORT=PORT_OF_YOUR_CHOICE IP="localhost"
4. `npm start` 

I don't have the register route on the front end. Make use of Postman to register a new user. Then point your favorite browser to `localhost:{PORT}/admin/login` and login with your credentials.

You'd be directed to the admin page. There you can create/edit post. Set up your profile. Once you have some data setup. Point your browser to `localhost:{PORT}` and you'll see your blog page.

**Here PORT represents the PORT value that you'd set in the 4th step

If you have any questions feel free to email me at contact@ayushbahuguna.com


