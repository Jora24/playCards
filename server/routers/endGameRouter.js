const { Router } = require("express");
const EndGameContoller = require("../controllers/endGameController");
const endGame = new EndGameContoller;
const endGameRouter = Router();

endGameRouter.get('/Game/:id/:win', endGame.addWinLose);

module.exports = endGameRouter;