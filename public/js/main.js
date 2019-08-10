// Get the two list elements
let taskList_active = document.getElementById('taskList_active')
let taskList_completed = document.getElementById('taskList_completed')

// This will hold all tasks regardless of their status
let allTasks = []

// Populate allTasks
tasks_active.forEach(function(task){    allTasks.push({ name: task.name, sub: task.sub, complete: false }) })
tasks_complete.forEach(function(task){  allTasks.push({ name: task.name, sub: task.sub, complete: true }) })


allTasks.forEach(function(task){
    // Create the task element
    let task_el = document.createElement('div')
    task_el.classList.add('task')

    // Set the task text
    let text = document.createElement('p')
    text.innerHTML = task.name + " - " + task.sub

    // Set the style of the task
    task.complete ? text.classList.add('completedTask') : text.classList.add('activeTask')

    // Define which POST request to fetch when the task is clicked
    let url = task.complete ? '/removeTask' : '/completeTask'

    // Add the event listener to the element to carry out the above POST request
    task_el.addEventListener('click', function (e) {

        // Send an XMLHTTP POST request with the task to complete
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify({ name: task.name }))

        location.reload()
    })

    // Add the task to the list
    task_el.appendChild(text)
    task.complete ? taskList_completed.appendChild(task_el) : taskList_active.appendChild(task_el)
})