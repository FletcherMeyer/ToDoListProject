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
    p.innerHTML = textContent + '<br><br><button id="delete'+ numOfTasks +'" class="taskButton" onclick="deleteElement(this.id)">❌</button> <button id="edit'+ numOfTasks +'" class="taskButton" onclick="editElement(this.id)">✏️</button>'
    document.getElementById("waitingRoom").appendChild(p);
}

function deleteElement(clicked_id){
    let id = clicked_id[6]//"delete(id)" will have the id as the 6th element of the string.
    let elem = document.getElementById('drag' + id);
    elem.parentNode.removeChild(elem);
}

function editElement(clicked_id){
    let id = clicked_id[4]//"delete(id)" will have the id as the 6th element of the string.
    let elem = document.getElementById('drag' + id);
    let innerText = elem.innerText.replace('\✏️','').replace('\❌','').replace('\✔️','');;
    elem.innerHTML =
    '<input value="'+ innerText +'" class="taskButton" id="input' + id + '" maxlength="100" size="20" />'+
    ' <button id="save'+ id +'" class="taskButton" onclick="save(this.id)">✔️</button>'+
    '<br><br>'+
    '<button id="delete'+ id +'" class="taskButton" onclick="deleteElement(this.id)">❌</button>'+
    ' <button id="edit'+ id +'" class="taskButton" onclick="editElement(this.id)">✏️</button>'
}

function save(clicked_id){
    let id = clicked_id[4]//"delete(id)" will have the id as the 6th element of the string.
    let save = document.getElementById('input' + id);
    let elem = document.getElementById('drag' + id);
    elem.innerHTML =
    save.value +
    '<br><br>'+
    '<button id="delete'+ id +'" class="taskButton" onclick="deleteElement(this.id)">❌</button>'+
    ' <button id="edit'+ id +'" class="taskButton" onclick="editElement(this.id)">✏️</button>'    
}
