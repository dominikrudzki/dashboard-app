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

	checkCookie(name = 'user') {
		if (
			!document.cookie
				.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')
				?.pop() ||
			''
		) {
			this.navigateToPath('/');
		} else {
			this.navigateToPath('/home');
		}
	}

	deleteCookie(cookieName: string) {
		document.cookie = `${cookieName}=`;
		this.navigateToPath('/');
	}
}
