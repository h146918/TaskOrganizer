import TaskList from "../task-list/main.js";
customElements.define('task-list', TaskList);

import TaskBox from "../task-box/main.js";
customElements.define('task-box', TaskBox);


const newtask = {
    "id": 5,
    "title": "Do DAT152",
    "status": "ACTIVE"
};


const status = {
    "id": 2,
    "status": "DONE"
};


const tasklist = document.querySelector("task-list");
const taskbox = document.querySelector("task-box");


tasklist.enableaddtask();

tasklist.addtaskCallback(() => taskbox.show());


tasklist.changestatusCallback(
    (id, newStatus) => console.log(`User chose ${newStatus} for task ${id}`)
);

tasklist.deletetaskCallback(
    (id) => {
        console.log(`Click event on delete button of task ${id}`)
    }
);

tasklist.noTask();

tasklist.showTask(newtask);

tasklist.updateTask(status);

tasklist.removeTask(1);

taskbox.close();