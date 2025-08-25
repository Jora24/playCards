const express = require("express");
const myUser = require("./routers/myUserRouter");
const newUser = require("./routers/newUserRouter");
const playFool = require("./routers/playFoolRouter");

const app = express();
const PORT = 3000;
app.use(express.json())

app.use("/checkUser", myUser);
app.use("/user", newUser);
app.use("/playFool", playFool);

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});
