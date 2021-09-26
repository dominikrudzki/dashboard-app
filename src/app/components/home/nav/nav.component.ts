import { Component, OnInit } from '@angular/core';
import { CookieService } from 'src/app/services/cookie.service';
import { DataService } from 'src/app/services/data.service';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
	username: string;

	constructor(private CookieService: CookieService) {
		this.username = this.CookieService.cookieUserName;
	}

	ngOnInit(): void {}
}
