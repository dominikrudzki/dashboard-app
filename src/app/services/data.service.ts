import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Subject } from 'rxjs';
import { TodoList, Todos } from '../shared/interfaces';
import { CookieService } from './cookie.service';

@Injectable({
	providedIn: 'root',
})
export class DataService {
	userData: { avatar: string; username: string; createDate: number } = {
		avatar: '',
		username: '',
		createDate: 1,
	};
	userDataSet: Subject<Boolean> = new Subject<Boolean>();
	allUsers: BehaviorSubject<any> = new BehaviorSubject<any>([]);
	// allUsers = [
	// 	{
	// 		avatar: 'https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_960_720.png',
	// 		username: 'username',
	// 		date: 0,
	// 	},
	// ];

	private todos: Todos = { todo: [], inProgress: [], done: [] };
	todosObs: BehaviorSubject<Todos> = new BehaviorSubject<Todos>(this.todos);

	constructor(
		private CookieService: CookieService,
		private firestore: AngularFirestore
	) {}

	setUserData(userData: any) {
		this.userData = userData;
		this.CookieService.setCookie('user', this.userData.username);
	}

	fetchAllUsers() {
		this.firestore
			.collection('users')
			.valueChanges()
			.forEach((user: any) => {
				this.allUsers.next(user);
			});
	}

	async setUserAvatar(userAvatar: string) {
		this.updateUserData({ avatar_url: `url('${userAvatar}')` });
		this.userData.avatar = `url('${userAvatar}')`;

		const snapshot = await this.firestore
			.collection('chat')
			.ref.where('author', '==', this.userData.username)
			.get();

		const messageIDs: string[] = [];
		snapshot.forEach((doc) => {
			messageIDs.push(doc.id);
		});

		messageIDs.forEach((messageID) => {
			this.firestore
				.collection('chat')
				.doc(messageID)
				.update({ avatar: this.userData.avatar });
		});
	}

	setUserPassword(userPassword: string) {
		this.updateUserData({ password: userPassword });
	}

	async fetchUserData() {
		const snapshot = await this.firestore
			.collection('users')
			.doc(this.CookieService.getCookieValue('user'))
			.get();

		snapshot.forEach((doc: any) => {
			this.userData.username = doc.data().username;
			this.userData.avatar = doc.data().avatar_url;
			this.userData.createDate = doc.data().create_date;

			this.userDataSet.next(true);
		});
	}

	updateUserData(val: {}) {
		this.firestore
			.collection(`users`)
			.doc(this.CookieService.getCookieValue('user'))
			.update(val);
	}

	getUserData() {
		this.userData.username = this.CookieService.getCookieValue('user');
		return this.userData;
	}

	addTodos(list: TodoList, item: any) {
		this.todos[list].push(item);
		this.updateTodos();
	}

	editTodos(list: TodoList, item: any, index: number) {
		this.todos[list][index].title = item.title;
		this.todos[list][index].description = item.description;

		this.updateTodos();
	}

	deleteTodos(list: TodoList, item: any) {
		this.todos[list].splice(list.indexOf(item), 1);
		this.updateTodos();
	}

	resetTodos() {
		this.todos = { todo: [], inProgress: [], done: [] };
	}

	fetchTodos() {
		const user = this.CookieService.getCookieValue('user');

		try {
			this.firestore
				.collection(`users/${user}/todo`)
				.doc('todos')
				.valueChanges()
				.subscribe((data: any) => {
					if (!data) {
						this.firestore
							.collection(`users/${user}/todo`)
							.doc('todos')
							.set(this.todos);
					}

					if (data) {
						this.todos = data;
						this.todosObs.next(data);
					}
				});
		} catch {
			// this.openSnackBar('Fill in the fields');
		}
	}

	updateTodos() {
		const user = this.CookieService.getCookieValue('user');

		setTimeout(() => {
			this.firestore
				.collection(`users/${user}/todo`)
				.doc('todos')
				.ref.update(this.todos);
		}, 500);
	}

	getSpecificTodo(listName: TodoList, index: number) {
		return this.todos[listName][index];
	}

	getTodos() {
		return this.todos;
	}

	clearTodos() {
		this.todos = { todo: [], inProgress: [], done: [] };
	}

	deleteAccount() {
		this.clearTodos();

		this.firestore
			.collection('users')
			.doc(this.userData.username)
			.delete()
			.then(() => {
				this.CookieService.deleteAllCookies();
			});
	}
}
