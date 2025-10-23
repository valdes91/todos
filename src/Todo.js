class ToDo {
	constructor({ title, description, dueDate, priority, isComplete = false }) {
		this.id = crypto.randomUUID();
		this.title = title;
		this.description = description;
		this.dueDate = dueDate;
		this.priority = priority;
		this.isComplete = isComplete;
	}
}

export default ToDo;
