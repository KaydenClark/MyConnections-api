const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')

const app = express()

const {testConnection} = require('./app.js')
const {newTask} = require('./app.js')
const {readTasks} = require('./app.js')
const {updateTask} = require('./app.js')
const {deleteTask} = require('./app.js')
const {newList} = require('./app.js')
const {readLists} = require('./app.js')
const {readFilteredLists} = require('./app.js')
const {updateList} = require('./app.js')
const {deleteList} = require('./app.js')
const {newUser} = require('./routes/signIn/signInMongo')
const {readTaskById} = require('./app.js')
const {readListById} = require('./app.js')

const port = process.env.PORT || 5000

// The "Database" we are making changes

app.use(express.json());
app.use(cors());
// app.use(require('./routes'))

app.get('/listsRaw', async (req, res) => {
    lists = await readLists()
    res.send(lists)
});

app.get('/lists', async (req, res) => {
    lists = await readFilteredLists()
    res.send(lists)
});

app.get('/tasks', async (req, res) => {
    tasks = await readTasks()
    res.send(tasks)
});

app.get('/tasks/:taskId', async (req, res) => {
    const taskId = req.params.taskId
    const task = await readTaskById(taskId)
    res.send(task)
});

app.get('/Lists/:listId', async (req, res) => {
    const listId = req.params.listId
    const list = await readListById(listId)
    res.send(list)
})

app.post('/lists', async (req, res) => {
    const new_list = req.body
    const list = await newList(new_list)
    res.send(list)
})

app.post('/tasks/:listId', async (req, res) => {
    const new_task = req.body
    const listId = req.params.listId
    const task = await newTask(new_task, listId)
    res.send(task)
})

app.patch('/lists/:id', async (req, res) => {
    const new_list = req.body
    const id = req.params.id
    const updatedTask = await updateList(id, new_list.todos)
    res.send(updatedTask)
})

app.put('/tasks/:id', async (req, res) => {
    const new_task = req.body
    const id = req.params.id
    const updatedTask = await updateTask(id, new_task.complete)
    res.send(updatedTask)
})

app.patch('/lists', async (req, res) => {
    const id = req.params.id
    res.send()
})

app.patch('/tasks/status/:id', async (req, res) => {
    const id = req.params.id
    res.send()
})

app.delete('/lists/:listId', async (req, res) => {
    await testConnection()
    const listId = req.params.listId
    const removeList = await deleteList(listId)
    res.send(removeList)
})

app.delete('/tasks/:taskId', async (req, res) => {
    await testConnection()
    const taskId = req.params.taskId
    const removeTask = await deleteTask(taskId)
    res.send(removeTask)
})

app.post('/signin', async(req, res) => {
    const userData = req.body
    const email = userData.userEmail
    const hash = userData.password
    console.log(email, hash)
    const userInfo = await newUser(email, hash)
    res.send(userInfo)
})


app.listen(port, () => console.log(`Express app ready on port ${port}!`))