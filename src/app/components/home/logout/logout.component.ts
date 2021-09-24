import { Component, OnInit } from '@angular/core';
import { CookieService } from 'src/app/services/cookie.service';

@Component({
	selector: 'app-logout',
	templateUrl: './logout.component.html',
	styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
	constructor(private cookieService: CookieService) {
		this.cookieService.deleteCookie('user');
	}

	ngOnInit(): void {}
}
