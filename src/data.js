import Project from './Project';

class StorageManager {
	static getProjects() {
		const projects = JSON.parse(localStorage.getItem('projects')) || [];
		return projects;
	}

	static saveProjects(projects) {
		localStorage.setItem('projects', JSON.stringify(projects));
	}
}

class DataManager {
	constructor() {
		this.projects = StorageManager.getProjects();
		if (this.projects.length === 0) {
			this.createDefaultProject();
		}
	}

	createDefaultProject() {
		const defaultProject = new Project('Default Project');
		this.addProject(defaultProject);
		this.saveProjects();
	}

	saveProjects() {
		StorageManager.saveProjects(this.projects);
	}

	getProjects() {
		return this.projects;
	}

	findProjectById(projectId) {
		return this.projects.find((proj) => proj.id === projectId);
	}

	addProject(project) {
		this.projects.push(project);
		this.saveProjects();
	}

	deleteProject(projectId) {
		this.projects = this.projects.filter((proj) => proj.id !== projectId);
		this.saveProjects();
	}

	addTodoToProject(projectId, todo) {
		const project = this.findProjectById(projectId);
		if (project) {
			project.todos.push(todo);
			this.saveProjects();
		}
	}

	deleteTodoFromProject(projectId, todoId) {
		const project = this.findProjectById(projectId);
		if (project) {
			project.todos = project.todos.filter((todo) => todo.id !== todoId);
			this.saveProjects();
		}
	}

	updateTodoInProject(projectId, updatedTodo) {
		const project = this.findProjectById(projectId);
		if (project) {
			const todoIndex = project.todos.findIndex((todo) => todo.id === updatedTodo.id);
			if (todoIndex !== -1) {
				project.todos[todoIndex] = updatedTodo;
				this.saveProjects();
			}
		}
	}
}

export default DataManager;
