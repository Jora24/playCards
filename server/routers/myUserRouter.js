const { Router } = require('express');
const MyUser = require("../controllers/myUserController");
const myUser = new MyUser;
const myUserRouter = Router();

myUserRouter.post("/selectUser", myUser.selectUser);
myUserRouter.put('/updateUser/:id', myUser.updateUser);
myUserRouter.delete('/deleteUser/:id', myUser.deleteUser);


module.exports = myUserRouter;