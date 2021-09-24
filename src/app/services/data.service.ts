import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class DataService {
	private userData: any;

	constructor() {}

	setUserData(userData: any) {
		this.userData = userData;
	}

	logIn(value: { username: string; password: string }) {}

	register(value: { username: string; password: string }) {}
}
