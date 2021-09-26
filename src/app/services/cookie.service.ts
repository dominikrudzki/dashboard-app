import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class CookieService {
	constructor(private route: Router) {}

	navigateToPath(path: string) {
		this.route.navigate([path]);
	}

	setCookie(cookieName: string, value: any, expDays: number = 1) {
		const date = new Date();
		date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
		document.cookie = `${cookieName}=${value}; expires=${date.toUTCString()}`;
	}

	checkCookie(name = 'user') {
		if (
			!document.cookie
				.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')
				?.pop() ||
			''
		) {
			this.navigateToPath('/');
			return false;
		} else {
			return true;
		}
	}

	deleteCookie(cookieName: string = 'user') {
		document.cookie.split(';').forEach(function (c) {
			document.cookie = c
				.replace(/^ +/, '')
				.replace(
					/=.*/,
					'=;expires=' + new Date().toUTCString() + ';path=/'
				);
		});

		this.navigateToPath('/');
	}
}
