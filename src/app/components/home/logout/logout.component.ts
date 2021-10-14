import { Component, OnInit } from '@angular/core';
import { CookieService } from 'src/app/services/cookie.service';
import { DataService } from 'src/app/services/data.service';

@Component({
	selector: 'app-logout',
	templateUrl: './logout.component.html',
	styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
	constructor(
		private cookieService: CookieService,
		private DataService: DataService
	) {}

	ngOnInit(): void {
		this.cookieService.deleteAllCookies();
		this.DataService.userData = {
			avatar: '',
			username: '',
			createDate: 1,
		};
	}
}
