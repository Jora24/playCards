const bcrypt = require('bcrypt');
const db = require('../db/models');
const { where } = require('sequelize');

class myUserController {
    async selectUser (req,res) {
        try{
            const { userName, phoneNumber, password } = req.body;
            const checkUser = await db.User.findOne({ where: { phoneNumber } });
            if (checkUser !== null){
                const checkPass = await bcrypt.compare( password , checkUser.dataValues.password );
                if ( userName == checkUser.dataValues.userName && phoneNumber == checkUser.dataValues.phoneNumber && checkPass == true ){
                    const selectUser = await db.User.findOne({ where: { phoneNumber } });
                    const user = {
                        name: selectUser.dataValues.userName,
                        phone: selectUser.dataValues.phoneNumber 
                    }
                    res.status(200).send(user);
                } else {
                    res.status(400).send( "geted name,password is false" );
                }
            } else {
                res.status(400).send( "geted number is false" );
            }
        } catch(e) {
            console.log(e);
            res.status(500).send({ error : e })
        }
    }
    async updateUser(req,res){
        try{
            const { id } = req.params
            const { userName, phoneNumber, password } = req.body;
            let checkUser
            if ( typeof(userName) === 'string' || typeof(phoneNumber) === 'number' || typeof(password) === "string" && id ){
                checkUser = await db.User.findOne({ where: { id: id } });

                if( userName ){
                    await db.User.update( { userName: userName }, { where: { id: checkUser.dataValues.id } } );
                } 
                if( phoneNumber ){
                    await db.User.update( {phoneNumber: phoneNumber},{ where: { id: checkUser.dataValues.id } } );
                } 
                if( password ){
                    const hashpass = await bcrypt.hash( password, 10 );
                    await db.User.update( {password: hashpass},{ where: { id: checkUser.dataValues.id } });
                }
                if ( userName && phoneNumber && password){
                    res.status(200).send(`Your name edited. it is --> ${ userName } and your nubmer edidet -->${phoneNumber} and your password edited`);
                }
                else if ( userName && phoneNumber ){
                    res.status(200).send(`Your name edited. it is --> ${ userName } and your nubmer edidet -->${phoneNumber}`);
                }
                else if ( userName && password ){
                    res.status(200).send(` your name edidet${userName} and password edited`);
                }
                else if ( phoneNumber && password ){
                    res.status(200).send(` your nubmer edidet -->${phoneNumber} and password edited`);
                }
                else if ( userName ){
                    res.status(200).send(` your name edidet -->${userName}`);
                }
                else if ( phoneNumber ){
                    res.status(200).send(` your nubmer edidet -->${phoneNumber}`);
                }
            } else {
                res.status(400).send('bad Request');
            }

        } catch(e){
            console.log(e);
            res.status(500).send({ error : e })
        
        }
    }
    async deleteUser ( req,res ){
        try{
            const { id } = req.params;
            const checkUser = db.User.findOne({ where: { id: id } });
            if (id && checkUser) {
                await db.User.destroy({ where:{ id: id } });
                res.status(200).send("your accaunt deleted");
            }else{
                res.status(400).send("bd request");
            }
        }
        catch(e){
            console.log(e);
            res.status(500).send({ error: e });
        }
    }
}

module.exports = myUserController;