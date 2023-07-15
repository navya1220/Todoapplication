let todoItemsContainer = document.getElementById("todoItemsContainer");
let addtodobutton = document.getElementById("addtodobutton");
let savebutton = document.getElementById("savebutton");

let todoList = [{
        text: "Learn HTML",
        uniqueId: 1
    },
    {
        text: "Learn CSS",
        uniqueId: 2
    },
    {
        text: "Learn JavaScript",
        uniqueId: 3
    }
];
savebutton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}
addtodobutton.onclick = function() {
    ontodobutton();
}

function ontodobutton() {
    let todoscount = todoList.length;
    todoscount = todoscount + 1;
    let userinput = document.getElementById("todoUserInput");
    let userinputvalue = userinput.value;
    if (userinputvalue === "") {
        alert("Enter valid Text");
    }
    let newtodo = {
        text: userinputvalue,
        uniqueId: todoscount
    };
    createAndAppendTodo(newtodo);
    userinput.value = " ";
}

function ontodostatus(checkboxid, labelid) {
    let checkelement = document.getElementById(checkboxid);
    console.log(checkelement.checked);
    let labelelement = document.getElementById(labelid);
    labelelement.classList.toggle("checked");
}

function ondeletetodo(todoid) {
    let tododelete = document.getElementById(todoid);
    todoItemsContainer.removeChild(tododelete);
}

function createAndAppendTodo(todo) {
    let checkboxid = "checkbox" + todo.uniqueId;
    let labelid = "label" + todo.uniqueId;
    let todoid = "todo" + todo.uniqueId;
    let todoElement = document.createElement("li");
    todoElement.id = todoid;
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxid;
    inputElement.classList.add("checkbox-input");
    inputElement.onclick = function() {
        ontodostatus(checkboxid, labelid);
    }
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxid);
    labelElement.id = labelid;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function() {
        ondeletetodo(todoid);
    }
    deleteIconContainer.appendChild(deleteIcon);
}

for (let todo of todoList) {
    createAndAppendTodo(todo);
}