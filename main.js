let numOfTasks = 0;

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
    p.ondragstart = function () { drag(event) };


    let textContent = document.getElementById("inputBox").value;
    if (textContent == "") return;
    p.innerHTML = textContent + '<br><br><button id="delete' + numOfTasks + '" class="taskButton" onclick="deleteElement(this.id)">❌</button> <button id="edit' + numOfTasks + '" class="taskButton" onclick="editElement(this.id)">✏️</button>'
    document.getElementById("waitingRoom").appendChild(p);
    document.getElementById("inputBox").value = "";
}

function deleteElement(clicked_id) {
    let id = clicked_id[6]//"delete(id)" will have the id as the 6th element of the string.
    let elem = document.getElementById('drag' + id);
    elem.parentNode.removeChild(elem);
}

function editElement(clicked_id) {
    let id = clicked_id[4]//"delete(id)" will have the id as the 6th element of the string.
    let elem = document.getElementById('drag' + id);
    let innerText = elem.innerText.replace('\✏️', '').replace('\❌', '').replace('\✔️', '');
    elem.innerHTML =
        '<input value="' + innerText + '" onkeypress="clickPress(event, null,' + id + ')" class="taskButton" id="input' + id + '" maxlength="100" size="20"/>' +
        ' <button id="save' + id + '" class="taskButton" onclick="save(this.id)">✔️</button>' +
        '<br><br>' +
        '<button id="delete' + id + '" class="taskButton" onclick="deleteElement(this.id)">❌</button>' +
        ' <button id="edit' + id + '" class="taskButton" onclick="editElement(this.id)">✏️</button>';

    document.getElementById("input" + id).focus();
}

function save(clicked_id) {
    let id = clicked_id[4] || clicked_id//"delete(id)" will have the id as the 6th element of the string.
    let save = document.getElementById('input' + id);
    let elem = document.getElementById('drag' + id);
    elem.innerHTML =
        save.value +
        '<br><br>' +
        '<button id="delete' + id + '" class="taskButton" onclick="deleteElement(this.id)">❌</button>' +
        ' <button id="edit' + id + '" class="taskButton" onclick="editElement(this.id)">✏️</button>'
}

function clearList() {
    for (let id = 1; id <= numOfTasks; id++) {
        try {
            let elem = document.getElementById("drag" + id);
            elem.parentNode.removeChild(elem);
        } catch {
            /* :3 */
        }
    }
}

function clickPress(event, type, id) {
    if (event.keyCode == 13 && type == "new") {
        createNewElement();
    } else if (event.keyCode == 13 && id !== null) {//Will pass the id of the input box. 
        save(id)
    }
}

/* Cookie Crap */

window.onload = function() {
    if (document.cookie == undefined) {
        p.innerHTML = "Walk my dog" + '<br><br><button id="delete0" class="taskButton" onclick="deleteElement(this.id)">❌</button> <button id="edit0" class="taskButton" onclick="editElement(this.id)">✏️</button>'
        document.getElementById("waitingRoom").appendChild(p);
    };    
    const cookieString = document.cookie;
    const cookies = cookieString.split(';')

    cookies.forEach(cookie => {
        const category = cookie.split("=")[0].replace('=','').replace(' ','');;
        const tempCookie = cookie.split("=")[1].split('q%');

        tempCookie.forEach(task => {
            if (task == "") return;
            numOfTasks++;
            
            const p = document.createElement("p");
            p.id = "drag" + numOfTasks;
            p.className = "tasks";
            p.draggable = true;
            p.ondragstart = function () { drag(event) };
    
            p.innerHTML = task + '<br><br><button id="delete' + numOfTasks + '" class="taskButton" onclick="deleteElement(this.id)">❌</button> <button id="edit' + numOfTasks + '" class="taskButton" onclick="editElement(this.id)">✏️</button>'
    
            try{
            document.getElementById(category).appendChild(p);
            } catch {
                console.log("cat: " + category)
            }
        });
    });

};


function saveCookies() {

    let toStartText = "";
    let collection = document.getElementById("toStart").children;
    for (let i = 0; i < collection.length; i++) {
        toStartText += collection[i].innerText.replace('\n\n', "").replace('\✏️', "").replace('\❌', "").replace('\✔️', "");;
    }

    let doingText = "";
    collection = document.getElementById("doing").children;
    for (let i = 0; i < collection.length; i++) {
        doingText += collection[i].innerText.replace('\n\n', "").replace('\✏️', "").replace('\❌', "").replace('\✔️', "");;
    }

    let finishedText = "";
    collection = document.getElementById("finished").children;
    for (let i = 0; i < collection.length; i++) {
        finishedText += "q%" + collection[i].innerText.replace('\n\n', "").replace('\✏️', "").replace('\❌', "").replace('\✔️', "");
    }
    document.cookie = "toStart="+toStartText+";"
    document.cookie = "doing="+doingText+";"
    document.cookie = "finished="+finishedText+";"

}

function clearCookies(){
    document.cookie = "toStart=;"
    document.cookie = "doing=;"
    document.cookie = "finished=;"

}
function testCookies() {
    console.log(document.cookie);
}
