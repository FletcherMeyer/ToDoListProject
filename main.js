let numOfTasks = 1;

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    if (ev.target.className !== "holder") return;
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

function createNewElement() {
    numOfTasks++;

    const p = document.createElement("p");
    p.id = "drag" + numOfTasks;
    p.className = "tasks";
    p.draggable = true;
    p.ondragstart = function(){drag(event)};

    
    let textContent = document.getElementById("inputBox").value;
    p.innerHTML = textContent + '<br><br><button id="delete'+ numOfTasks +'" class="taskButton" onclick="deleteElement(this.id)">Delete</button>'
    document.getElementById("waitingRoom").appendChild(p);
}

function deleteElement(clicked_id){
    let id = clicked_id[6]//"delete(id)" will have the id as the 6th element of the string.
    let elem = document.getElementById('drag' + id);
    elem.parentNode.removeChild(elem);
}
