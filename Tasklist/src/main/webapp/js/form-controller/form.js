import TaskList from "../task-list/main.js";
customElements.define('task-list', TaskList);


import TaskBox from "../task-box/main.js";
customElements.define('task-box', TaskBox);


const tasklist = document.querySelector("task-list");
const taskbox = document.querySelector("task-box");


loadTask();

tasklist.enableaddtask();

tasklist.addtaskCallback(() => taskbox.show());

tasklist.changestatusCallback(
    (id, newStatus) => {
        console.log(`User chose ${newStatus} for task ${id}`);
        updateTask(id, newStatus);
    }
);

tasklist.deletetaskCallback(
    (id) => {

        console.log(`Click event on delete button of task ${id}`);
        removeTask(id);
    }
);

taskbox.close();

taskbox.newtaskCallback((task) => {
    console.log(`New task '${task.title}' with initial status ${task.status} is added by the user.`);
    addTask(task);

});

tasklist.noTask();


/********************************************************************************************************************************************/

/**
 * GET request: Gets all tasks and status from the database
 */
async function loadTask() {

    const resTasks = await fetch("/TaskServices/api/services/tasklist");
    const resStatus = await fetch("/TaskServices/api/services/allstatuses");


    if (resTasks.ok && resStatus.ok) {
        const tasksRes = await resTasks.text();
        const tasksObj = JSON.parse(tasksRes);
        const tasks = tasksObj.tasks;

        const statusRes = await resStatus.text();
        const statusObj = JSON.parse(statusRes);
        const status = statusObj.allstatuses;

        tasklist._createTasks(tasks, status);

    }

}

/**
 * POST request: Adds a new task to the database
 * @param { Object } task 
 */
async function addTask(task) {

    const requestSettings = {
        "method": "POST",
        "headers": { "Content-Type": "application/json; charset=utf-8" },
        "body": JSON.stringify(task),
        "cache": "no-cache",
        "redirect": "error"
    };

    try {
        if (task.title != "" && task.status != "") {

            //const response = await fetch("/TaskService/broker/task", requestSettings);
            const resTask = await fetch("/TaskServices/api/services/task", requestSettings);
            const resStatus = await fetch("/TaskServices/api/services/allstatuses");

            if (resTask.ok && resStatus.ok) {
                const taskRes = await resTask.text();
                const taskObj = JSON.parse(taskRes);
                const task = taskObj.task;

                const statusRes = await resStatus.text();
                const statusObj = JSON.parse(statusRes);
                const status = statusObj.allstatuses;

                if (taskObj.responseStatus && statusObj.responseStatus) {
                    tasklist.showTask(task, status);
                }
            }
        }
    } catch (e) {
        console.log("Error addTask: " + e);
    }
}//Slutt addTask


/**
 * DELETE request: Delete a task from the database
 * @param { Integer } id 
 */
async function removeTask(id) {

    try {

        const res = await fetch(`/TaskServices/api/services/task/${id}`, { "method": "DELETE" });
        if (res.ok) {
            const taskRes = await res.text();
            const taskObj = JSON.parse(taskRes);
            if (taskObj.responseStatus) {
                tasklist.removeTask(id);
                console.log("Deleted from server");
                tasklist.noTask();
            }
        }
    } catch (e) {
        console.log("Error removeTask: " + e);
    }
}//Slutt removeTask


/**
 * PUT request: Updates a task in the database
 * @param { Integer } id 
 * @param { String } status - new status
 */
async function updateTask(id, status) {

    const requestSettings = {
        "method": "PUT",
        "headers": { "Content-Type": "application/json; charset=utf-8" },
        "body": JSON.stringify({ "status": status }),
        "cache": "no-cache",
        "redirect": "error"
    };

    try {

        const res = await fetch(`/TaskServices/api/services/task/${id}`, requestSettings);
        if (res.ok) {

            const taskRes = await res.text();
            const taskObj = JSON.parse(taskRes);
            const task = taskObj;

            if (taskObj.responseStatus) {
                tasklist.updateTask(task);
                console.log("Updated on server");
            }
        }

    } catch (e) {
        console.log("Error updateTask: " + e);
    }
}//Slutt updateTask









