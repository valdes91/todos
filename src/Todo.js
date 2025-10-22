class ToDo {
	constructor(title, description, description, dueDate, priority, isCComplete = false) {
		this.id = crypto.randomUUID();
		this.title = title;
		this.description = description;
		this.dueDate = dueDate;
		this.priority = priority;
		this.isCComplete = isCComplete;
	}
}

export default ToDo;
