const date = document.querySelector('#date');
const list = document.querySelector('#list');
const input = document.querySelector('#input');
const enterButton = document.querySelector('#enter');

// fijarse que va 
console.log(date);

//Add task function

function addTask (addTask) {
    const addToList =  `<li id="addTask">
                        <i class="far fa-circle co" data="done" id="0"></i>
                        <p class="text">${addTask}</p>
                        <i class="fas fa-trash de" data="deleted" id="0"></i>
                        </li>`
    list.insertAdjacentHTML("beforeend",addToList);   
}

enterButton.addEventListener('click', () => {
    const taskText = input.value;
    if (taskText) {
        addTask(taskText);
    }
    input.value = '';
});

document.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        const taskText = input.value;
        if (taskText) {
            addTask(taskText);
        }
        input.value = '';
    }
});
