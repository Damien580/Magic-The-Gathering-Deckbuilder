const mtg = require('mtgsdk')
const express = require('express')
const cors = require ('cors')
const path = require('path')
const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(cors())

const {
    getAllCards,
    changeSet,
    changeColor,
    changeType,
    cardInput,
    deleteCard
} = require ('./controller')

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../public/magic.html'))
})

app.get('/deckLink', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../public/magic2.html'))
})
app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../public/magic2.html'))
})


app.get('/cards', getAllCards)
app.get('/sets', changeSet)
app.get('/colors', changeColor)
app.get('/types', changeType)
app.post('/cards', cardInput)
app.delete('/cards/:id', deleteCard)



app.listen(4000, () => console.log('Server running on 4000'));