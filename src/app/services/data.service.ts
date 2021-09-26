import { Injectable } from '@angular/core';
import { CookieService } from './cookie.service';

@Injectable({
	providedIn: 'root',
})
export class DataService {
	private userData: any;

	constructor(private CookieService: CookieService) {}

	setUserData(userData: any) {
		this.userData = userData;
		this.CookieService.setCookie('user', this.userData.username);
	}

	logIn(value: { username: string; password: string }) {}

	register(value: { username: string; password: string }) {}
}
