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

export interface Message {
	id: number;
	author: string;
	message: string;
	date: number;
}
