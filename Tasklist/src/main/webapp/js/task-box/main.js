export default class TaskBox extends HTMLElement {


    constructor() {

        super();
        this._shadow = this.attachShadow({ mode: 'closed' });
        this._createLink();
        this._createHTML();

    }





    _createLink() {
        const link = document.createElement('link');

        const path = import.meta.url.match(/.*\//)[0];
        link.href = path.concat("style.css");
        link.rel = "stylesheet";
        link.type = "text/css";
        this._shadow.appendChild(link);

    }//Slutt createLink


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


    show() {


        document.querySelector("#modal-container").style.zIndex = "1";
        document.querySelector("#modal").style.display = "block";
        document.querySelector("#parent").style.backgroundColor =
            "rgba(220, 220, 220, 0.8)";
        console.log("Clicked open");

    }//Slutt show



    close() {

        document.querySelector('#close').addEventListener('click', () => {
            document.querySelector("#modal-container").style.zIndex = "-1";
            document.querySelector('#modal').style.display = 'none';
            document.querySelector('#parent').style.backgroundColor =
                'rgb(255, 255, 255)';


            console.log('Clicked closed');
        });

    }







}//Slutt class











