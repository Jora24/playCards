const db = require("../db/models");

class whoWin {
    async addWinLose(req,res) {
        try {
            const { id, win } = req.params;
            const user = await db.User.findOne( {where: { id: id } });
            const winUser = await db.GameStatistic.findOne({ where: { userId: id } });
            if ( win == "true" && winUser !== null ) {
                await db.GameStatistic.update({ winGame: winUser.dataValues.winGame + 1 }, { where: {userId: id } });
                console.log(1)
                res.status(200).send(`player ${user.dataValues.userName} win!!!`);
            }
            if ( win == "false" && winUser !== null ) {
                await db.GameStatistic.update({ loseGame: winUser.dataValues.loseGame + 1 }, { where: {userId: id } });
                console.log(2)
                res.status(200).send(`player ${user.dataValues.userName} lose`);
    
            }
            if ( win == "true" && winUser == null ){
                await db.GameStatistic.create({ winGame: 1, loseGame: 0, userId: id });
                console.log(3)
                res.status(200).send(`player ${user.dataValues.userName} win!!!`);
            }
            if ( win == "false" && winUser == null ){
                await db.GameStatistic.create({ winGame: 0, loseGame: 1, userId: id });
                console.log(4)
                res.status(200).send(`player ${user.dataValues.userName} lose`);
            }
        }
        catch(e) {
            console.log(e) 
            res.status(500).send(e);
        }
    }
}

module.exports = whoWin;