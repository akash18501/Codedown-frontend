//Getting all the data about the list on the left 
const listsContainer = document.querySelector('[data-lists]'); 
const newListForm = document.querySelector('[data-new-list-form]'); 
const newListInput = document.querySelector('[data-new-list-input]');
const deleteListButton = document.querySelector('[data-delete-list-button]'); 

//Getting all the data about the actual totdo in the middle

const listDisplaycontainer = document.querySelector('[data-list-display-container]');
const listTitleElement = document.querySelector('[data-list-title]');
const listCountElement = document.querySelector('[data-list-count]'); 
const tasksContainer = document.querySelector('[data-tasks]'); 
const taskTemplate = document.getElementById('task-template'); 
const newTaskForm = document.querySelector('[data-new-task-form]'); 
const newTaskInput = document.querySelector('[data-new-task-input]'); 
const clearCompleteTask = document.querySelector('[data-clear-complete-task-button]');
// console.log(clearCompleteTask)

// console.log(newTaskInputskForm); 
// console.log(newTaskInput); 


// console.log(taskTemplate); 

// console.log(listDisplaycontainer); 
// console.log(listTitleElement); 
// console.log(listCountElement); 
// console.log(tasksContainer); 





const Local_Storage_List_Key = 'task.lists'; 
const Local_Storage_Selected_list_id = 'task.SelectedListId'; 

let lists = JSON.parse(localStorage.getItem(Local_Storage_List_Key)) || [];
let SelectedListId = localStorage.getItem(Local_Storage_Selected_list_id); 



clearCompleteTask.addEventListener('click',e => {
	const selectedList = lists.find(list => list.id === SelectedListId); 
	selectedList.tasks = selectedList.tasks.filter(task => !task.complete); 
	saveAndRender(); 
})


//delete the list that is selected when the delete button is pressed
deleteListButton.addEventListener('click',e => {
	lists = lists.filter(list => list.id !== SelectedListId)

	SelectedListId = null; 
	saveAndRender();  
})

 
//to make the selected list darker
listsContainer.addEventListener('click',e =>{
	if(e.target.tagName.toLowerCase() === 'li'){
		SelectedListId = e.target.dataset.listId; 
		saveAndRender(); 
	}
})


tasksContainer.addEventListener('click' , e => {
	if(e.target.tagName.toLowerCase() === 'input'){
		const selectedList = lists.find(list => list.id === SelectedListId); 
		const selectedTask = selectedList.tasks.find(task => task.id == e.target.id); 
		// console.log(selectedTask); 
		selectedTask.complete = e.target.checked; 
		save(); 
		renderTaskcount(selectedList);  
	}
})

//to create a new list and add it to the ul tag
newListForm.addEventListener('submit',e =>{
	e.preventDefault(); 
	const listName = newListInput.value; 
	if(listName == null || listName === '') return; 
	const list = createList(listName);
	newListInput.value = null; 
	lists.push(list); 
	saveAndRender();  

})


//to create a new task and add it to the task list 
newTaskForm.addEventListener('submit',e => {
	e.preventDefault(); 
	const taskName = newTaskInput.value; 
	if(taskName == null || taskName === '') return; 

	const task = createTask(taskName); 
	newTaskInput.value = null; 
	const selectedList = lists.find(list => list.id === SelectedListId); 
	selectedList.tasks.push(task); 
	saveAndRender(); 
})

//to save (to the local storage) and to display(render)
function saveAndRender() {
	save(); 
	render(); 
}

//save function 
function save(){
	localStorage.setItem(Local_Storage_List_Key, JSON.stringify(lists));
	localStorage.setItem(Local_Storage_Selected_list_id,SelectedListId);  
}

//the actual create list function , returns the created list
function createList(name){
	return {id:Date.now().toString() , name: name , tasks:[] }
}


//to create the actual task 
function createTask(name) {
	return {id:Date.now().toString(), name:name,complete:false};
}


//render function 
function render() {
	const selectedList = lists.find(list => list.id === SelectedListId); 
	clearElement(listsContainer); 
	renderList(); 
	if(SelectedListId == null){
		listDisplaycontainer.style.display = 'none'; 

	}
	else{
		listDisplaycontainer.style.display = 'initial'; 
		listTitleElement.innerText =  selectedList.name; 
		renderTaskcount(selectedList); 
		clearElement(tasksContainer); 
		renderTasks(selectedList); 
	}

}


function renderTasks(selectedList) {
	selectedList.tasks.forEach(task => {
		const  taskElement = document.importNode(taskTemplate.content, true); 
		const checkbox = taskElement.querySelector('input'); 
		checkbox.checked = task.complete; 
		// console.log(checkbox); 
		checkbox.id = task.id; 
		const label = taskElement.querySelector('label'); 
		// console.log(label); 
		label.htmlFor = task.id; 
		label.append(task.name);
		tasksContainer.appendChild(taskElement); 


	})
}


function renderTaskcount(selectedList) {
	const incompleteTaskCount = selectedList.tasks.filter(task => !task.complete).length; 
	const tasktag = incompleteTaskCount>1?'tasks':'task'; 
	listCountElement.innerText = `${incompleteTaskCount} ${tasktag} ramaining`;


}


function renderList(argument) {
		lists.forEach(list => {
		const listElement = document.createElement('li');
		listElement.dataset.listId = list.id;  
		listElement.classList.add('list-name'); 
		if(list.id === SelectedListId) {
			listElement.classList.add('active-list'); 
		}
		listElement.innerText = list.name; 
		listsContainer.appendChild(listElement); 

	})
}

function clearElement(element){
	while(element.firstChild){
		element.removeChild(element.firstChild); 

	}
}

render(); 