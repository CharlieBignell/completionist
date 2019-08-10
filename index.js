const express = require('express');
const bodyParser = require('body-parser')

let app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set('view engine', 'pug')

app.use(express.static(__dirname + '/public'));

let active = [{ name: "active task", sub: "description" }]
let completed = [{ name: "completed task", sub: "description" }]

/*-------------------
|   POST methods    |
-------------------*/

app.post('/addtask', function (req, res) {
    let name = req.body.name
    let sub = req.body.sub
    if (name.toString().length > 0) {
        active.push({
            name: name,
            sub: sub
        })
    }
    res.redirect("/")
});

app.post("/completeTask", function (req, res) {
    let name = req.body.name

    // Find the task
    active.forEach(function (task) {
        if (task.name == name) {
            // Add to completed and remove from active
            completed.push(task)
            active.splice(active.indexOf(task), 1)
        }
    })
});

app.post("/removeTask", function (req, res) {
    let name = req.body.name

    // Find the task
    completed.forEach(function (task) {
        if (task.name == name) {
            // Remove the task
            completed.splice(completed.indexOf(task), 1)
        }
    })
});


/*-------------------
|   GET methods    |
-------------------*/
app.get("/", function (req, res) {
    res.render("index", { tasks: active, completed: completed })
});


// Start server
app.listen(3000, function () {
    console.log('Listening on port 3000')
})