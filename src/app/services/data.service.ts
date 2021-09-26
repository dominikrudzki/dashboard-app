import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CookieService } from './cookie.service';

@Injectable({
	providedIn: 'root',
})
export class DataService {
	private userData!: { username: string };

	constructor(private CookieService: CookieService) {}

	setUserData(userData: any) {
		this.userData = userData;
		this.CookieService.setCookie('user', this.userData.username);
	}

	getUserData() {
		return this.userData;
	}

	logIn(value: { username: string; password: string }) {}

	register(value: { username: string; password: string }) {}
}
