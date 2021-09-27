export interface TodosItem {
	id: number;
	title: string;
	description: string;
	list: string;
}

export interface Todos {
	todo: TodosItem[];
	inProgress: TodosItem[];
	done: TodosItem[];
}
