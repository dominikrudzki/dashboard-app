import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class DataService {
	private userData: any;

	constructor() {}

	setCookie(cookieName: string, value: any, expDays: any = 1) {
		const date = new Date();
		date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
		document.cookie = `${cookieName}=${value}; expires=${date.toUTCString()}`;
	}

	setUserData(userData: any) {
		this.userData = userData;
		this.setCookie('user', this.userData.username);
	}

	logIn(value: { username: string; password: string }) {}

	register(value: { username: string; password: string }) {}
}
