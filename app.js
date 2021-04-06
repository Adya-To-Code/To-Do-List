const form= document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter= document.querySelector('#filter');
const taskInput= document.querySelector('#task');

//Load all event listeners 
loadEventListeners();

function loadEventListeners()
{
  // dom load event 
  document.addEventListener('DOMContentLoaded',getTasks);
  // Add task event 
  form.addEventListener('submit', addTask);
  
     // remove task event 
  taskList.addEventListener('click',removeTask);
  clearBtn.addEventListener('click',clearTask1);
  filter.addEventListener('keyup',filterTask);
}
//get tasks from ls 
function getTasks(){
  let task1;
   if(localStorage.getItem('task1')=== null){
     task1 = [];
   }else{
     task1 = JSON.parse(localStorage.getItem('task1'));
   }
          task1.forEach(function(task){

            // create a li element 
const li = document.createElement('li');
// add class 
li.className ='collection-item';
// create a text node nad append to li 
li.appendChild(document.createTextNode(task));
// create a link
const link = document.createElement('a');
// add class
link.className ='delete-item secondary-content';// secondary content is given so that it comes on right side
// add icon html
link.innerHTML ='<i class ="fa fa-remove"></i>';
console.log(li);
li.appendChild(link);
taskList.appendChild(li);
          });
        }
// add task 
function addTask(e)
{ 
  if(taskInput.value === '') {
    alert('Add Task');
  }
 

// create a li element 
const li = document.createElement('li');
// add class 
li.className ='collection-item';
// create a text node nad append to li 
li.appendChild(document.createTextNode(taskInput.value));
// create a link
const link = document.createElement('a');
// add class
link.className ='delete-item secondary-content';// secondary content is given so that it comes on right side
// add icon html
link.innerHTML ='<i class ="fa fa-remove"></i>';
console.log(li);
li.appendChild(link);
taskList.appendChild(li);
storeTaskInLocalStorage(taskInput.value);
e.preventDefault();

}

// store task 
function storeTaskInLocalStorage(task)
{
   let task1;
   if(localStorage.getItem('task1')=== null){
     task1 = [];
   }else{
     task1 = JSON.parse(localStorage.getItem('task1'));
   }
         task1.push(task);
         localStorage.setItem('task1',JSON.stringify(task1));
  }

function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item'))
  {
    if(confirm('are you sure')){
    e.target.parentElement.parentElement.remove();
  }
  // remove task from ls
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
}
}
 // remove function 
 function  removeTaskFromLocalStorage (taskItem)
 {
  let task1;
  if(localStorage.getItem('task1')=== null){
    task1 = [];
  }else{
    task1 = JSON.parse(localStorage.getItem('task1'));
  }
  task1.forEach(function(task , index){
       if (taskItem.textContent === task){
         task1.splice(index,1);
       }
       localStorage.setItem('task1',JSON.stringify(task1));
  });
 }
function clearTask1(){
    while(taskList.firstChild){
      taskList.removeChild(taskList.firstChild);
    }
     clearTaskLocalStorage();
}
function clearTaskLocalStorage(taskItem1)
{
  localStorage.clear(); 
}
 function filterTask(e){
      const text = e.target.value.toLowerCase();
      document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text)!=-1)
        {
          
          task.style.display ='block';
        }
        else{
          task.style.display= 'none';
        }
      });
 }

  
  