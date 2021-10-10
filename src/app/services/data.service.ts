import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { TodoList, Todos } from '../shared/interfaces';
import { CookieService } from './cookie.service';

@Injectable({
	providedIn: 'root',
})
export class DataService {
	userData!: { avatar: string; username: string; createDate: number };
	private todos: Todos = { todo: [], inProgress: [], done: [] };
	todosObs: BehaviorSubject<Todos> = new BehaviorSubject<Todos>(this.todos);

	// todosChange: Subject<Todos> = new Subject<Todos>();

	constructor(
		private CookieService: CookieService,
		private firestore: AngularFirestore
	) {}

	setUserData(userData: any) {
		this.userData = userData;
		this.CookieService.setCookie('user', this.userData.username);
	}

	setUserAvatar(userAvatar: string) {
		this.updateUserData({ avatar_url: `url('${userAvatar}')` });
	}

	setUserPassword(userPassword: string) {
		this.updateUserData({ password: userPassword });
	}

	fetchUserData() {
		this.firestore
			.collection('users')
			.doc(this.userData.username)
			.valueChanges()
			.subscribe((data: any) => {
				this.userData.avatar = data.avatar_url;
				this.userData.username =
					this.CookieService.getCookieValue('user');
				this.userData.createDate = data.create_date;

				console.log(this.userData);

				return this.userData;
				// console.log(this.userData);
			});
	}

	updateUserData(val: {}) {
		this.firestore
			.collection(`users`)
			.doc(this.userData.username)
			.update(val);
	}

	getUserData() {
		// this.userData.avatar =
		this.userData.username = this.CookieService.getCookieValue('user');
		return this.userData;
	}

	addTodos(list: TodoList, item: any) {
		this.todos[list].push(item);
		console.log('addTodos', this.todos);

		this.updateTodos();
	}

	editTodos(list: TodoList, item: any, index: number) {
		console.log(list, item);

		// this.todos[list].
		console.log(this.todos[list][index]);

		this.todos[list][index].title = item.title;
		this.todos[list][index].description = item.description;

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
					// this.todosChange.next();

					if (!data) {
						console.log('no path!');
						this.firestore
							.collection(`users/${user}/todo`)
							.doc('todos')
							.set(this.todos);
					}

					if (data) {
						this.todos = data;
						this.todosObs.next(data);
					}

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
				.ref.update(this.todos)
				.then(() => {
					console.log('updated!', this.todos);
				});
		}, 500);
	}

	getSpecificTodo(listName: TodoList, index: number) {
		return this.todos[listName][index];
	}

	getTodos() {
		return this.todos;
	}

	deleteAccount() {
		this.firestore
			.collection('users')
			.doc(this.userData.username)
			.delete()
			.then(() => {
				this.CookieService.deleteAllCookies();
			});
	}
}
