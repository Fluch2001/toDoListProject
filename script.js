const date = document.querySelector('#date');
const list = document.querySelector('#list');
const input = document.querySelector('#input');
const enterButton = document.querySelector('#enter');
const check = 'fa-check-circle';
const uncheck = 'fa-circle';
const lineThrough = 'lineThrough';
let id = 0;
let arrayList = [];


// Date time

const DATE = new Date()
date.innerHTML = DATE.toLocaleDateString('eng-US',{weekday:'long',month:'short',day:'numeric'})

//Add task function

function addTask (taskText, id, done, deleted) {

    if(deleted){return} 

    const DONE = done ? `fas ${check}` : `far ${uncheck}`;
    const LINE = done ?lineThrough :''

    const addToList =  `<li id="addTask">
                        <i class="${DONE}" data="done" id="${id}"></i>
                        <p class="text ${LINE}">${taskText}</p>
                        <i class="fas fa-trash de" data="deleted" id="${id}"></i>
                        </li>`
    list.insertAdjacentHTML("beforeend",addToList);   
}

// Done task function

function doneTask(element){
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)

    const id = parseInt(element.id);
    arrayList[id].done = !arrayList[id].done;
}

// Deleted task function

function deletedTask(element) {
    element.parentNode.parentNode.removeChild(element.parentNode)

    const id = parseInt(element.id);
    arrayList[id].deleted = true;
    }


enterButton.addEventListener('click', () => {
    const taskText = input.value;
    if (taskText) {
        addTask(taskText, id, false, false)
        arrayList.push({
            name:taskText,
            id:id,
            done:false,
            deleted:false
        })
    };
    localStorage.setItem('listToDo',JSON.stringify(arrayList))
    input.value = '';
    id++;
});

document.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        const taskText = input.value;
        if (taskText) {
            addTask(taskText, id, false, false)
            arrayList.push({
            name:taskText,
            id:id,
            done:false,
            deleted:false
        })
        };
        localStorage.setItem('listToDo',JSON.stringify(arrayList))
        input.value = '';
        id++;
    }
});

list.addEventListener('click',function(event){

    const element = event.target;
    const elementData = element.attributes.data.value;
    if(elementData === 'done'){
        doneTask(element);
    }
    else if (elementData === 'deleted'){
        deletedTask(element);
    }
    localStorage.setItem('listToDo',JSON.stringify(arrayList))
});

// localeStorage get item

let data = localStorage.getItem('listToDo')
if(data){
    arrayList = JSON.parse(data)
    id = arrayList.length
    loadList(arrayList)
} else {
    arrayList = [];
    id = 0;
};

function loadList(information){
    information.forEach(function(i){
        addTask(i.name, i.id, i.done, i.deleted)
    })
}