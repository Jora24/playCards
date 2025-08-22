const { Router } = require('express');
const NewUser = require("../controllers/newUserController");
const newUser = new NewUser;
const newUserRouter = Router();

newUserRouter.post('/addUser', newUser.addUser);


module.exports = newUserRouter;