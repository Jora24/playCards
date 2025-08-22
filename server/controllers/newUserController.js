const bcrypt = require('bcrypt');
const db = require("../db/models");

class newUserController {
    async addUser (req, res) {
        try {
            const { userName, phoneNumber, password } = req.body;
            const checkNumber = await db.User.findOne({ where: { phoneNumber } });
            if ( typeof( userName ) === 'string' && typeof( phoneNumber ) === 'number' && checkNumber === null && typeof( password ) === 'string'){ 
                const hashpass = await bcrypt.hash( password, 10 );
                await db.User.create({ userName,phoneNumber, password: hashpass });
                res.status(200).send("you sining");
            }else if (checkNumber !== null) { 
                res.status(400).send("this phone number already sign up");
            }
            else{
                res.status(400).send("geted date is false");
            }
        } catch (e) {
            console.log(e);
            res.status(500).send({ error : e })
        }
    };

}

module.exports = newUserController;