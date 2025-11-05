import './styles.css';
import DataManager from './data.js';
import ProjectController from './ProjectController.js';

const dataManager = new DataManager();
const projectController = new ProjectController(dataManager);
const addProjectButton = document.getElementById('show-add-project-dialog');
const addTaskButton = document.getElementById('show-add-task-dialog');
const projectControlElement = document.querySelector('.project-control');
const projectListElement = document.querySelector('.project-list');
const projectTodosElement = document.querySelector('.project-todos');

// Function to render the list of projects
function renderProjectList() {
	projectListElement.innerHTML = ''; // Clear existing list
	const projects = projectController.getAllProjects();

	projects.forEach((project) => {
		const li = document.createElement('li');
		li.textContent = project.name;
		li.classList.add('py-05');
		li.dataset.projectId = project.id;

		li.addEventListener('click', () => {
			renderProjectTodos(project.id);
		});

		projectListElement.appendChild(li);
	});
}

function createTodoCard(todoObj) {
	const todoDiv = document.createElement('div');
	todoDiv.classList.add('todo', 'p05');

	const todoTitle = document.createElement('h3');
	const todoDescription = document.createElement('p');
	const dueDate = document.createElement('p');
	const priority = document.createElement('p');
	const completedDiv = document.createElement('div');
	const completedLabel = document.createElement('label');
	const completedCheckbox = document.createElement('input');

	todoTitle.classList.add('py-05');
	todoTitle.innerText = todoObj.title;
	todoDescription.classList.add('py-05');
	todoDescription.innerText = todoObj.description;
	dueDate.classList.add('py-05');
	dueDate.innerText = todoObj.dueDate;
	priority.classList.add('py-05');
	priority.innerText = `Priority: ${todoObj.priority}`;
	completedDiv.classList.add('completed', 'py-05');
	completedLabel.htmlFor = 'completed';
	completedLabel.innerText = 'Complete';
	completedCheckbox.type = 'checkbox';
	completedCheckbox.id = 'completed';
	completedCheckbox.checked = todoObj.isComplete;

	completedDiv.append(completedLabel, completedCheckbox);
	todoDiv.append(todoTitle, todoDescription, dueDate, priority, completedDiv);
	projectTodosElement.appendChild(todoDiv);
}

// Function to render todos for a selected project
function renderProjectTodos(projectID) {
	projectTodosElement.innerHTML = '';

	projectControlElement.dataset.projectId = projectID;
	const project = dataManager.findProjectById(projectID);
	const projectHeader = projectControlElement.querySelector('h2');
	projectHeader.innerText = project.name;

	project.todos.forEach((todo) => {
		createTodoCard(todo);
	});

	if (projectTodosElement.innerHTML == '') {
		const noTodos = document.createElement('h3');
		noTodos.innerText = `No Tasks for ${project.name}`;
		projectTodosElement.appendChild(noTodos);
	}
}

renderProjectList();
