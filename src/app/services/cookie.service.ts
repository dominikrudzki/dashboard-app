import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class CookieService {
	constructor(private route: Router) {}

	navigateToLoginPage() {
		this.route.navigate(['/']);
	}

	checkCookie(name = 'user') {
		if (
			!document.cookie
				.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')
				?.pop() ||
			''
		) {
			this.navigateToLoginPage();
		}
	}

	deleteCookie(cookieName: string) {
		document.cookie = `${cookieName}=`;
		this.navigateToLoginPage();
	}
}
