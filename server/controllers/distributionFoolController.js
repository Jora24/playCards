const { createDeck } = require("../../calods/fool");
const deck = createDeck();
const db = require('../db/models');


class distribution {
    async start (req,res) {
        try{
            const { id } = req.params;
            const findUser = await db.User.findOne({ where: { id } })
            const user = {
            userName: findUser.dataValues.userName,
            cards: [
                 {
                        size: -1
                    },
                    {
                        size: -1
                    },
                    {
                        size: -1
                    },
                    {
                        size: -1
                    },
                    {
                        size: -1
                    },
                    {
                        size: -1,
                    }
            ]
                };
            const userBot = {
                userName: "bot",
                cards: [ 
                    {
                        size: -1
                    },
                    {
                        size: -1
                    },
                    {
                        size: -1
                    },
                    {
                        size: -1
                    },
                    {
                        size: -1
                    },
                    {
                        size: -1
                    }
                ]
            }
            let trumpCard
            for ( let i = 0; i <= 5; i++ ) {
                let randomCardsUser = Math.floor( Math.random() * ( deck.length - 1 - 0 + 1 ) ) + 0;
                let randomCardsUserBot = Math.floor( Math.random() * ( deck.length - 1 - 0 + 1) ) + 0;
                if (user.cards[i].size !== deck[randomCardsUser].size && userBot.cards[i].size !== deck[randomCardsUserBot].size ){
                    user.cards[i] = deck[randomCardsUser];
                    userBot.cards[i] = deck[randomCardsUserBot];
                    deck.splice( randomCardsUser, 1 );
                    deck.splice( randomCardsUserBot, 1 );
                }
                for ( let i ; i != 14; ){
                    let randomTrumpCard = Math.floor( Math.random() * ( deck.length - 1 -0 + 1 ) ) + 0;
                    let selectTrumpCard = deck[randomTrumpCard]; 
                if (selectTrumpCard.size !== 14){
                    trumpCard = selectTrumpCard;
                    i = 14;
                }
                }
             
            }
            res.status(200).send({ user,userBot, trumpCard })
        }
        catch(e){
            console.log(e)
            res.status(500).send(e);
        }
    }
    

}

module.exports = distribution