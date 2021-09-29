import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { TodoList, Todos } from '../shared/interfaces';
import { CookieService } from './cookie.service';

@Injectable({
	providedIn: 'root',
})
export class DataService {
	private userData!: { username: string };
	private todos: Todos = { todo: [], inProgress: [], done: [] };

	constructor(
		private CookieService: CookieService,
		private firestore: AngularFirestore
	) {}

	setUserData(userData: any) {
		this.userData = userData;
		this.CookieService.setCookie('user', this.userData.username);
	}

	getUserData() {
		return this.userData;
	}

	addTodos(list: TodoList, item: any) {
		this.todos[list].push(item);
		console.log('addTodos', this.todos);

		this.updateTodos();
	}

	deleteTodos(list: TodoList, item: any) {
		console.log(this.todos[list][item]);
		this.todos[list].splice(list.indexOf(item), 1);
		this.updateTodos();
	}

	resetTodos() {
		this.todos = { todo: [], inProgress: [], done: [] };
	}

	fetchTodos() {
		const user = this.CookieService.getCookieValue('user');

		try {
			const sub = this.firestore
				.collection(`users/${user}/todo`)
				.doc('todos')
				.valueChanges()
				.subscribe((data: any) => {
					console.log('fetchTodos!');
					console.log(data);

					if (!data) {
						console.log('no path!');
						this.firestore
							.collection(`users/${user}/todo`)
							.doc('todos')
							.set(this.todos);
					}

					if (data) {
						this.todos = data;
					}
					console.log('update todos');

					sub.unsubscribe();
				});
		} catch {
			// this.openSnackBar('Fill in the fields');
		}
	}

	updateTodos() {
		console.log('todos updated!');
		const user = this.CookieService.getCookieValue('user');

		setTimeout(() => {
			this.firestore
				.collection(`users/${user}/todo`)
				.doc('todos')
				.update(this.todos)
				.then(() => {
					console.log('updated!', this.todos);
				});
		}, 500);
	}

	getTodos() {
		return this.todos;
	}
}
