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

	clearTodos() {
		for (let key in this.todos) {
			this.todos[key] = [];
		}
	}

	fetchTodos() {
		console.log('fetchTodos!');
		this.clearTodos();
		// const user = this.cookieService.getCookieValue('user');
		this.todos;

		const user = 'admin';

		try {
			this.firestore
				.collection(`users/${user}/todo`)
				.valueChanges()
				.subscribe((data: any) => {
					data.forEach((item: any) => {
						if (item.list === 'todo') this.todos.todo.push(item);
						if (item.list === 'inProgress')
							this.todos.inProgress.push(item);
						if (item.list === 'done') this.todos.done.push(item);
					});
				});
		} catch {
			// this.openSnackBar('Fill in the fields');
		}
	}

	getTodos() {
		return this.todos;
	}
}
