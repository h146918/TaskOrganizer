

export async function loadTask() {

    const resTasks = await fetch("http://localhost:8080/TaskServices/api/services/tasklist");
    // const res = await fetch("/TaskService/broker/tasklist",{ "headers": { "Content-Type": "application/json; charset=utf-8" } });
    const resStatus = await fetch("http://localhost:8080/TaskServices/api/services/allstatuses");


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




export async function addTask(task) {

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
            const res = await fetch("/TaskServices/api/services/task", requestSettings);
            if (res.ok) {
                const taskRes = await res.text();
                const taskObj = JSON.parse(taskRes);
                const task = taskObj.task;
                if (taskObj.responseStatus) {
                    tasklist.showTask(task);

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


                }
            }

        }
    } catch (e) {
        console.log("Error  " + e);
    }
}//Slutt addTask


export async function removeTask(id) {

    try {

        const res = await fetch(`/TaskServices/api/services/task/${id}`, { "method": "DELETE" });
        if (res.ok) {
            const taskRes = await res.text();
            const taskObj = JSON.parse(taskRes);
            if (taskObj.responseStatus) {
                tasklist.removeTask(id);
                console.log("Deleted from server");
            }
        }


    } catch (e) {
        console.log("Error  " + e);
    }
}//Slutt removeTask


export async function updateTask(id, status) {

    const requestSettings = {
        "method": "PUT",
        "headers": { "Content-Type": "application/json; charset=utf-8" },
        "body": JSON.stringify({ "staus": status }),
        "cache": "no-cache",
        "redirect": "error"
    };

    try {

        const res = await fetch(`/TaskServices/api/services/task/${id}`, requestSettings);
        if (res.ok) {

            console.log("res: " + res);
            const taskRes = await res.text();
            const taskObj = JSON.parse(taskRes);
            const task = taskObj.task;
            if (taskObj.responseStatus) {
                tasklist.showTask(task);
                console.log("Updated on server");
            }
        }


    } catch (e) {
        console.log("Error  " + e);
    }
}