let globalID = 1
let items = []

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
        // console.log(items)
        items.splice(items.findIndex(items => items.id === +id), 1)
        // console.log(items)

        res.status(200).send(items)
    },
    updateItem: (req, res) => {
        const {text} = req.body
        const {id} = req.params

        let index = items.findIndex(item => item.id === +id)

        console.log(text)
        items[index].text = text
        console.log(items[index])

        res.status(200).send(items)


    }
}