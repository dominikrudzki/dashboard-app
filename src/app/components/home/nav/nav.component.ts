import { Component, OnInit } from '@angular/core';
import { CookieService } from 'src/app/services/cookie.service';
import { DataService } from 'src/app/services/data.service';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
	userData: any;

	constructor(
		private CookieService: CookieService,
		private DataService: DataService
	) {
		this.userData = this.DataService.getUserData();
	}

	ngOnInit(): void {}
}
