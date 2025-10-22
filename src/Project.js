class Project {
	constructor(name) {
		this.id = crypto.randomUUID();
		this.name = name;
		this.todos = [];
	}
}

export default Project;
