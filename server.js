const express = require('express')

const app = express()

app.use(express.json())

app.listen('8080', () => {
    console.log('app running at 8080');
})

var users = []

app.get('/', (req, res) => {
    res.send({"users":users})
})

app.post('/', (req, res) => {
    const { username, password } = req.body
    users.push({ id:users.length+1, username, password })
    res.send({username,password})
})

app.delete('/', (req, res) => {
    const { id } = req.query

    if (!id) {
        res.send("Id is required")
    }

    const filteredUsers = users.filter(user => user.id != Number(id))
    if (filteredUsers.length == users.length) {
        res.send("user not found")
    }

    users = filteredUsers
    res.send("user deleted")
})
