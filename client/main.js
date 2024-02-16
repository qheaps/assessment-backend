const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("fortuneButton")
const submitBtn = document.getElementById("todo-submit")
const deleteBtn = document.getElementById("todo-delete")
const updateIdBtn = document.getElementById("todo-update-id")
const updateSubmitBtn = document.getElementById("todo-update-submit")


function postItem(obj) {
    axios.post("http://localhost:4000/api/todo/", obj)
    .then(res => {
        createListItem(res.data)
    })
}

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
        });
};

function getFortune() {
    axios.get("http://localhost:4000/api/fortune/")
        .then(res => {
            const data = res.data;
            alert(data);
        });
}

function createListItem(data) {
    const itemEl = document.createElement(`li`)
    itemEl.setAttribute(`id`, data.id)

    itemEl.textContent = data.text

    document.getElementById(`todo-list`).appendChild(itemEl)
}

function killMe(e) {
    e.preventDefault()

    let itemObj = {
        text: document.getElementById(`todo-input`).value
    }
    postItem(itemObj)
}

function removeItem(id) {
    const listEl = document.getElementById(`${id}`)
    listEl.remove()
}

function deleteListItem(evt) {
    evt.preventDefault()
    delId = +document.getElementById(`todo-input`).value
    axios.delete(`http://localhost:4000/api/todo/${delId}`)
    .then(() => {
        removeItem(delId)
    })
}

function updateListItem(id, newText) {
    const listEl = document.getElementById(`${id}`)
    listEl.textContent(newText)
}

function updateItem(evt) {
    evt.preventDefault()

    updId = +document.getElementById(`todo-input`).value
    console.log(updId)
    axios.post(`http://localhost:4000/api/todo/${updId}`)
    .then(res => {
        newText = document.getElementById(`todo-update-input`).value
        updateListItem(updId, newText)
        console.log(newText)

    })
}

// function getID (evt) {
//     evt.preventDefault()


// }

fortuneBtn.addEventListener(`click`, getFortune)
complimentBtn.addEventListener('click', getCompliment)
submitBtn.addEventListener(`click`, killMe)
deleteBtn.addEventListener(`click`, deleteListItem)
// updateIdBtn.addEventListener(`click`, getID)
updateSubmitBtn.addEventListener(`click`, updateItem)

