const cardData = require("mtgsdk")
const cardArr = []

module.exports = {
    getAllCards: (req, res) => {
        cardData.card.where({
         })
        .then(response => {
            res.status(200).send(response)
        })
    },

    deleteCard: (req, res) => {
        let { id } = req.params
        console.log(id)
        let index = cardArr.findIndex(cards => cards.id === +id)
        cardArr.splice(index, 1)
        res.status(200).send(cardArr)
    },

    cardInput: (req, res) => {
        
        console.log(req.body)
        let newCard = {...req.body}
        cardData.card.where({
            set: req.body.drop1,
            number: req.body.cardInput
        }).then(response => {
            console.log(response)
            cardArr.push(response[0])
            res.status(200).send(cardArr)
        }).catch(err => console.log(err))
    },

    changeSet: (req, res) => {
        const request = req.query //pulling info for the function in index.js
        cardData.card.where({
            set: request.set,
            colorIdentity: request.color,
            types: request.types
        }).then(response => {
            res.status(200).send(response)
        })
    },

    changeColor: (req, res) => {
        const request = req.query
        cardData.card.where({
            colorIdentity: request.set,
        }).then(response => {
            res.status(200).send(response)
        })
    },

    changeType: (req, res) => {
        const request = req.query
        cardData.card.where({
            type: request.set, 
        }).then(response => {
            res.status(200).send(response)
        })
    }
}