// Get the two list elements
let taskList_active = document.getElementById('taskList_active')
let taskList_completed = document.getElementById('taskList_completed')

let allTasks = []

tasks_active.forEach(function(task){
    allTasks.push({
        name: task,
        complete: false
    })
})

tasks_complete.forEach(function(task){
    allTasks.push({
        name: task,
        complete: true
    })
})

allTasks.forEach(function(task){
    let task_el = document.createElement('div')
    task_el.classList.add('task')

    // The 'complete' button
    let url = task.complete ? '/removeTask' : '/completeTask'

    task_el.addEventListener('click', function (e) {

        // Send an XMLHTTP POST request with the task to complete
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url, true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify({ task: task.name }))

        location.reload()
    })

    let text = document.createElement('p')

    text.innerHTML = task.name

    if(task.complete){
        text.classList.add('completedTask')
    }else{
        text.classList.add('activeTask')

    }

    task_el.appendChild(text)
    taskList_active.appendChild(task_el)
})