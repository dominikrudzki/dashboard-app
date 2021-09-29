export interface TodosItem {
	id: number;
	title: string;
	description: string;
	list: string;
}

export type Todos = {
	[key in TodoList]: TodosItem[];
};

export type TodoList = 'todo' | 'inProgress' | 'done';
