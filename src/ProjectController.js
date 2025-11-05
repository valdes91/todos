import Project from './Project.js';
import ToDo from './Todo.js';

class ProjectController {
	constructor(dataManager) {
		this.dataManager = dataManager;
	}

	getAllProjects() {
		return this.dataManager.getProjects();
	}

	createProject(projectName) {
		const newProject = new Project(projectName);
		this.dataManager.addProject(newProject);
		return newProject;
	}

	deleteProject(projectId) {
		this.dataManager.deleteProject(projectId);
	}

	addTodoToProject(projectId, todoObj) {
		const newTodo = new ToDo(todoObj);
		this.dataManager.addTodoToProject(projectId, newTodo);
		return newTodo;
	}

	// make sure updatedTodoObj contains the id of the todo to be updated from DOM controller
	updateTodoInProject(projectId, updatedTodoObj) {
		this.dataManager.updateTodoInProject(projectId, updatedTodoObj);
		return this.dataManager.findTodoById(projectId, updatedTodoObj.id);
	}

	deleteTodoFromProject(projectId, todoId) {
		this.dataManager.deleteTodoFromProject(projectId, todoId);
	}
}

export default ProjectController;
