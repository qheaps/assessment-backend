let globalID = 1
let items = []

var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '3b378524ade44debba86885102ec8ee5',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },
    getFortune: (req, res) => {
        const fortune = ["Good fortune", "Bad fortune", "Lukewarm fortune", "Steve J.", "Blackrock"];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * fortune.length);
        let randomFortune = fortune[randomIndex];
        rollbar.info("Someone Got Fortunes")
        res.status(200).send(randomFortune);
    },
    
    createItem: (req, res) => {
        const { text, id } = req.body

        let newItem = {
            id: globalID,
            text: text
        }

        // console.log(newItem)
        globalID++
        items.push(newItem)
        res.status(200).send(newItem)
    },
    deleteItem: (req, res) => {
        const { id } = req.params
        items.splice(items.findIndex(items => items.id === +id), 1)

        res.status(200).send(items)
    },
    updateItem: (req, res) => {
        const newText = req.body.newText
        const {id} = req.params
        let index = items.findIndex(item => item.id === +id)
        if (index === -1) {
            rollbar.warning("user attempted to modify item that does not exist.")
            console.log("nope")
        } else {
            items[index].text = newText
            console.log(items[index])
            console.log(items)
        }
        res.status(200).send(items)
    }
}