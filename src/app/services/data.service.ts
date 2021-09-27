import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Todos } from '../shared/interfaces';
import { CookieService } from './cookie.service';

@Injectable({
	providedIn: 'root',
})
export class DataService {
	private userData!: { username: string };
	private todos: Todos | any = { todo: [], inProgress: [], done: [] };

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

	logIn(value: { username: string; password: string }) {}

	register(value: { username: string; password: string }) {}

	// clearTodos() {
	// 	for (let key in this.todos) {
	// 		this.todos[key] = [];
	// 	}
	// }

	fetchTodos() {
		// this.clearTodos();
		const user = this.CookieService.getCookieValue('user');
		// const user = 'admin';

		try {
			const sub = this.firestore
				.collection(`users/${user}/todo`)
				.doc('todos')
				.valueChanges()
				.subscribe((data: any) => {
					console.log('fetchTodos!');
					console.log(data);

					this.todos = data;

					sub.unsubscribe();
				});
		} catch {
			// this.openSnackBar('Fill in the fields');
		}
	}

	updateTodos(newTodos: Todos) {
		console.log('todos updated!');
		this.todos = newTodos;
		const user = this.CookieService.getCookieValue('user');
		console.log('new todos', newTodos);

		setTimeout(() => {
			this.firestore
				.collection(`users/${'admin'}/todo`)
				.doc('todos')
				.update(this.todos)
				.then(() => {
					console.log('updated!', this.todos);
				});
		}, 1000);
	}

	getTodos() {
		return this.todos;
	}
}
