import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class CookieService {
	// cookieUser!: any;

	constructor(private route: Router) {}

	setCookie(cookieName: string, value: any, expDays: number = 1) {
		const date = new Date();
		date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
		document.cookie = `${cookieName}=${value}; expires=${date.toUTCString()}`;
		// this.cookieUser = value;
	}

	getCookieValue = (name: string) =>
		document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() ||
		'';

	checkCookie(name = 'user') {
		if (
			!document.cookie
				.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')
				?.pop() ||
			''
		) {
			this.route.navigate(['/']);
			return false;
		} else {
			// this.cookieUserName = this.getCookieValue('user');
			return true;
		}
	}

	deleteAllCookies() {
		const deleteCookie = (cookie: string, path: string) => {
			document.cookie = cookie
				.replace(/^ +/, '')
				.replace(
					/=.*/,
					'=;expires=' + new Date().toUTCString() + ';path=' + path
				);
		};

		document.cookie.split(';').forEach((cookie) => {
			deleteCookie(cookie, '/');
			deleteCookie(cookie, '/home');
		});

		this.route.navigate(['/']);
	}
}
