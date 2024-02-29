const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}/client`))

const { getCompliment, getFortune, createItem, deleteItem, updateItem } = require('./controller')

app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune)
app.post("/api/todo", createItem)
app.delete("/api/todo/:id", deleteItem)
app.put("/api/todo/:id", updateItem)


app.listen(4000, () => console.log("Server running on 4000"));
