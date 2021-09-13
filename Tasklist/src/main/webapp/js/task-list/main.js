export default class TaskList extends HTMLElement {

    /**
     * Creates the shadow dom, link tag and the html starter code
     * @constructor
     */
    constructor() {

        super();

        this._shadow = this.attachShadow({ mode: "closed" });
        this._createLink();
        this._createHTML();

    }//Slutt constructor


    /**
     * Creates link tag and append it to the shadow dom
     * @private
     */
    _createLink() {
        const link = document.createElement('link');

        const path = import.meta.url.match(/.*\//)[0];
        link.href = path.concat("style.css");
        link.rel = "stylesheet";
        link.type = "text/css";
        this._shadow.appendChild(link);

    }//Slutt createLink


    /**
     * Creates a root element with starting html code and append it to the shadow dom
     * @private
     */
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


    /**
     * Creates the html table and inserts tasks if they exsist in the database
     * @private
     * @param { Object } tasks - Object with tasks
     * @param { Object } status - Object with status
     * 
     */
    _createTasks(tasks, status) {


        try {
            const root = this._shadow.getElementById("root");

            const table = document.createElement("table");
            table.setAttribute("id", "task-list")

            if (tasks.length > 0) {

                let content = "<tr><th>Task</th><th>Status</th></tr>";

                for (let i = (tasks.length - 1); i >= 0; i--) {
                    content += `
                                <tr class="tasks" id="${tasks[i].id}">
                                <td>${tasks[i].title}</td>
                                <td>${tasks[i].status}</td>
                                <td><select>
                                <option selected="selected">Modify</option>
                                <option value=${status[0]}>${status[0]}</option>
                                <option value=${status[1]}>${status[1]}</option>
                                <option value=${status[2]}>${status[2]}</option>
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
            console.log("Error _createTasks: " + e);
        }

    }//Slutt loadTask


    /**
     * Enables the New task button
     * @public
     */
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
            console.log("Error enableaddtask: " + e);
        }




    }//Slutt enableaddtask


    /**
     * Adds a callback on the New task button - click event
     * @public
     * @param { function } callback - callback sent from the form-controller
     */
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
            console.log("Error addtaskCallback: " + e);
        }



    }//Slutt addtaskCallback


    /**
     * Adds a callback on tasks - change event
     * @public
     * @param { function } callback - callback sent from the form-controller
     */
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
                            task.children[1].innerHTML = status;
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
            console.log("Error changestatusCallback: " + e);
        }

    }//Slutt changestatusCallback


    /**
     * Adds a callback on remove button - click event
     * @public
     * @param { function } callback - callback sent from the form-controller
     */
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
            console.log("Error deletetaskCallback: " + e);
        }

    }//Slutt deletetaskCallback


    /**
     * Show message when there are no tasks
     * @public
     */
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
            console.log("Error noTask: " + e);
        }

    }//Slutt noTask


    /**
     * Adds a new task and updates number of tasks
     * @public
     * @param { Object } task - Object with new task
     * @param { Object } status - Object with status
     */
    showTask(task, status) {

        try {

            const tasks = this._shadow.querySelector("#task-list");

            if (tasks != null) {

                let content = `
                          <tr class="tasks" id=${task.id}>
                          <td>${task.title}</td>
                          <td>${task.status}</td>
                          <td><select>
                          <option selected="selected">Modify</option>
                          <option value=${status[0]}>${status[0]}</option>
                          <option value=${status[1]}>${status[1]}</option>
                          <option value=${status[2]}>${status[2]}</option>
                          </select></td>
                          <td><button class="btn-remove">Remove</button></td>
                          </tr>` ;

                tasks.firstElementChild.firstElementChild.insertAdjacentHTML("afterend", content);

                const statusMsg = this._shadow.querySelector("#status");
                const taskNum = this._shadow.querySelectorAll(".tasks")
                statusMsg.innerHTML = `Found ${taskNum.length} tasks.`;

                location.reload();

            } else {

                setTimeout(() => {
                    this.showTask(task);
                }, 100);

            }
        } catch (e) {
            console.log("Error showTask: " + e);
        }

    }//Slutt showTask


    /**
     * Updates a task
     * @public
     * @param { Object } update - Object with task update
     */
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
            console.log("Error updateTask: " + e);
        }
    }//Slutt updateTask


     /**
     * Removes a task
     * @public
     * @param { Integer } id - Id of task
     */
    removeTask(id) {

        try {

            const connected = this._shadow.querySelector("#task-list");
            if (connected != null) {

                this._shadow.getElementById(id).remove();


                const status = this._shadow.querySelector("#status");
                const taskNum = this._shadow.querySelectorAll(".tasks")
                status.innerHTML = `Found ${taskNum.length} tasks.`;
            } else {
                setTimeout(() => {
                    this.removeTask(id);
                }, 100);
            }

        } catch (e) {
            console.log("Error removeTask: " + e);
        }
    }//Slutt removeTask



}//Slutt class















