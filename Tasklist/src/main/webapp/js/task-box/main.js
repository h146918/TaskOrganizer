export default class TaskBox extends HTMLElement {


     /**
     * Creates the shadow dom and the html starter code
     * @constructor
     */
    constructor() {

        super();
        this._shadow = this.attachShadow({ mode: 'closed' });
        this._createHTML();

    }


    /**
     * Creates a modal and append it to parent element
     * @private
     */
    _createHTML() {
        const parent = document.querySelector("#parent");
        const root = document.createElement("div");
        root.setAttribute("id", "modal-container");

        const content = `
        <div id="modal">
            <h3>Title:<input type="text" id="title"/></h3>
            <h3>Status:<select id="status">
            <option value="ACTIVE" selected="selected">ACTIVE</option>
            <option value="WAITING">WAITING</option>
            <option value="DONE">DONE</option>
            </select></h3>
            <button id="add">Add task</button>
        <div id="close">&#x2715</div>
        `;

        root.insertAdjacentHTML("beforeend", content);
        parent.appendChild(root);

        return root;

    }//Slutt createHTML


    /**
     * Show the modal
     * @public
     */
    show() {

        document.querySelector("#modal-container").style.zIndex = "1";
        document.querySelector("#modal").style.display = "block";
        document.querySelector("#parent").style.backgroundColor =
            "rgba(220, 220, 220, 0.8)";

        console.log("Clicked open");

    }//Slutt show


    /**
     * Close the modal
     * @public
     */
    close() {

        document.querySelector('#close').addEventListener('click', () => {
            document.querySelector("#modal-container").style.zIndex = "-1";
            document.querySelector('#modal').style.display = 'none';
            document.querySelector('#parent').style.backgroundColor =
                'rgb(255, 255, 255)';

            console.log('Clicked closed');
        });

    }


     /**
     * Adds a callback on the Add task button - click event
     * @public
     * @param { function } callback - callback sent from the form-controller
     */
    newtaskCallback(callback) {

        if (typeof callback == "function") {

            const btn = document.querySelector("#add");

            btn.addEventListener("click", () => {
                const title = document.querySelector("#title").value;
                const status = document.querySelector("#status").value;

                const task = {
                    title: title,
                    status: status
                }

                document.querySelector("#modal-container").style.zIndex = "-1";
                document.querySelector('#modal').style.display = 'none';
                document.querySelector('#parent').style.backgroundColor =
                    'rgb(255, 255, 255)';

                callback(task);


            });

        }
    }


}//Slutt class











