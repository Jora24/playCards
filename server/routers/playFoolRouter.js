const { Router } = require('express');
const PlayFool = require('../controllers/distributionFoolController');
const playFool = new PlayFool;
const playFoolRouter = Router();

playFoolRouter.get('/play/:id', playFool.start);

module.exports = playFoolRouter;
