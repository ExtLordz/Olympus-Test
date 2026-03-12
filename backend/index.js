const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

let tasks = [
    { id: 1, title: 'OlyTest' },
    { id: 2, title: 'KMS' }
]

app.get('/tasks', (req, res) => {
    res.json(tasks)
})

app.post('/tasks', (req, res) => {
    const newTask = {
        id: Date.now(),
        title: req.body.title
    }
    tasks.push(newTask)
    res.status(201).json(newTask)
})

app.put('/tasks/:id', (req, res) => {
    const id = Number(req.params.id)
    const task = tasks.find(t => t.id === id)

    if (!task) {
        return res.status(404).json({ message: 'Task not found' })
    }

    task.title = req.body.title
    res.json(task)
})

app.delete('/tasks/:id', (req, res) => {
    const id = Number(req.params.id)
    tasks = tasks.filter(t => t.id !== id)
    res.status(204).end()
})

app.listen(3000, () => {
    console.log('API running on http://localhost:3000')
})