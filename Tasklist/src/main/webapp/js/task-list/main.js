export default class TaskList extends HTMLElement {


    constructor() {

        super();

        this._shadow = this.attachShadow({ mode: "closed" });
        this._createLink();
        this._createHTML();
        this._loadTasks();

    }//Slutt constructor

      _createLink() {
        const link = document.createElement('link');

        const path = import.meta.url.match(/.*\//)[0];
        link.href = path.concat("style.css");
        link.rel = "stylesheet";
        link.type = "text/css";
        this._shadow.appendChild(link);

    }//Slutt createLink


    _createHTML() {

        const root = document.createElement("div");
        root.setAttribute("id", "root");

        const content = `
        <h3 id="status">Waiting for server data.</h3>		
		<button disabled="true" id="button">New task</button>`;

        root.insertAdjacentHTML("beforeend", content);
        this._shadow.appendChild(root);

        return root;

    }//Slutt createHTML


    async _loadTasks() {


        try {

            const root = this._shadow.getElementById("root");
            const res = await fetch("Tasks.json");
            
            const tasksJson = await res.text();
            const tasks = JSON.parse(tasksJson);




            const table = document.createElement("table");
            table.setAttribute("id", "task-list")

            if (tasks.length > 0) {

                let content = "<tr><th>Task</th><th>Status</th></tr>";

                for (let i = 0; i < tasks.length; i++) {
                    content += `
                                <tr class="tasks" id="${tasks[i].id}">
                                <td>${tasks[i].title}</td>
                                <td>${tasks[i].status}</td>
                                <td><select>
                                <option selected="selected">Modify</option>
                                <option value="ACTIVE">ACTIVE</option>
                                <option value="WAITING">WAITING</option>
                                <option value="DONE">DONE</option>
                                </select></td>
                                <td><button class="btn-remove">Remove</button></td>
                                </tr>`
                }

                table.insertAdjacentHTML("beforeend", content);
                root.firstElementChild.innerHTML = `Found ${tasks.length} tasks.`;

            }
            root.insertBefore(table, undefined);

            console.log("Fetched data");

        } catch (e) {
            console.log("Error: " + e);
        }

    }//Slutt loadTask


    enableaddtask() {

        try {

            const connected = this._shadow.querySelector("#task-list");

            if (connected != null) {
                console.log("Connected");
                const btn = this._shadow.querySelector("#button");
                btn.disabled = false;

            } else {
                setTimeout(() => {
                    this.enableaddtask();
                }, 100);
            }


        } catch (e) {
            console.log("Error: " + e);
        }




    }//Slutt enableaddtask


    addtaskCallback(callback) {

        try {

            const connected = this._shadow.querySelector("#task-list");


            if (connected != null && typeof callback == "function") {

                const btn = this._shadow.querySelector("#button");
                btn.addEventListener("click", callback);

            } else {
                setTimeout(() => {
                    this.addtaskCallback(callback);
                }, 100);
            }

        } catch (e) {
            console.log("Error: " + e);
        }



    }//Slutt addtaskCallback

    changestatusCallback(callback) {

        try {
            const connected = this._shadow.querySelector("#task-list");

            if (connected != null && typeof callback == "function") {

                const tasks = this._shadow.querySelectorAll(".tasks");

                for (let task of tasks) {

                    task.addEventListener("change", () => {

                        const id = task.id;
                        const text = task.firstElementChild.textContent;
                        const status = task.children[2].firstElementChild.value;

                        if (status != "Modify" && window.confirm(`Set '${text}' to ${status} `)) {
                            callback(id, status);
                        };

                    });
                };
            } else {
                setTimeout(() => {
                    this.changestatusCallback(callback);
                }, 100);
            }

        } catch (e) {
            console.log("Error: " + e);
        }

    }//Slutt changestatusCallback

    deletetaskCallback(callback) {

        try {

            const connected = this._shadow.querySelector("#task-list");

            if (connected != null && typeof callback == "function") {

                const tasks = this._shadow.querySelectorAll(".tasks");
                for (let task of tasks) {
                    const btn = task.querySelector(".btn-remove");

                    btn.addEventListener("click", () => {

                        const id = task.id;
                        const text = task.firstElementChild.textContent;

                        if (window.confirm(`Delete task '${text}'`)) {
                            callback(id);
                        };

                    });
                }

            } else {
                setTimeout(() => {
                    this.deletetaskCallback(callback);
                }, 100);
            }
        } catch (e) {
            console.log("Error: " + e);
        }

    }//Slutt deletetaskCallback


    noTask() {

        try {

            const connected = this._shadow.querySelector("#task-list");
            if (connected != null) {
                const tasks = this._shadow.querySelectorAll(".tasks");
                const status = this._shadow.querySelector("#status");

                if (tasks.length == 0) {
                    status.innerHTML = "No tasks were found."
                }

            } else {

                setTimeout(() => {
                    this.noTask();
                }, 100);
            }
        } catch (e) {
            console.log("Error: " + e);
        }

    }//Slutt noTask

    showTask(task) { //Oppdater for knapper

        try {
            const tasks = this._shadow.querySelector("#task-list");

            if (tasks != null) {

                let content = `
                          <tr class="tasks" id=${task.id}>
                          <td>${task.title}</td>
                          <td>${task.status}</td>
                          <td><select>
                          <option selected="selected">Modify</option>
                          <option value="ACTIVE">ACTIVE</option>
                          <option value="WAITING">WAITING</option>
                          <option value="DONE">DONE</option>
                          </select></td>
                          <td><button class="btn-remove">Remove</button></td>
                          </tr>` ;

                tasks.firstElementChild.firstElementChild.insertAdjacentHTML('afterend', content);

            } else {

                setTimeout(() => {
                    this.showTask(task);
                }, 100);

            }
        } catch (e) {
            console.log("Error: " + e);
        }

    }//Slutt showTask



    updateTask(update) {

        try {

            const connected = this._shadow.querySelector("#task-list");
            if (connected != null) {

                let task = this._shadow.getElementById(`${update.id}`);
                task.children[1].innerHTML = update.status;
            } else {
                setTimeout(() => {
                    this.updateTask(update);
                }, 100);
            }

        } catch (e) {
            console.log("Error: " + e);
        }
    }//Slutt updateTask


    removeTask(id) {

        try {

            const connected = this._shadow.querySelector("#task-list");
            if (connected != null) {

                this._shadow.getElementById(id).remove();
            } else { 
                setTimeout(() => {
                    this.removeTask(id);
                }, 100);
            }

        } catch (e) {
            console.log("Error: " + e);
        }
    }//Slutt removeTask



}//Slutt class















