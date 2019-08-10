const express = require('express');
const bodyParser = require('body-parser')

let app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set('view engine', 'pug')

app.use(express.static(__dirname + '/public'));

let tasks = ["active task"]
let completed = ["finished task"]

// POST methods
app.post('/addtask', function (req, res) {
    let newTask = req.body.newtask
    if (newTask.toString().length > 0) { tasks.push(newTask) }
    res.redirect("/")
});

app.post("/completeTask", function (req, res) {
    let task = req.body.task
    completed.push(task);
    tasks.splice(tasks.indexOf(task), 1);
});

app.post("/removeTask", function (req, res) {
    let task = req.body.task
    completed.splice(tasks.indexOf(task), 1);
});


// GET methods
app.get("/", function (req, res) {
    res.render("index", { tasks: tasks, completed: completed })
});


// Start server
app.listen(3000, function () {
    console.log('Listening on port 3000')
})