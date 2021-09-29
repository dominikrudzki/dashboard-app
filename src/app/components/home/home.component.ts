import { Component, OnDestroy, OnInit } from '@angular/core';
import { CookieService } from 'src/app/services/cookie.service';
import { DataService } from 'src/app/services/data.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
	constructor(
		private CookieService: CookieService,
		private DataService: DataService
	) {
		this.CookieService.checkCookie();
		this.DataService.fetchTodos();
	}

	ngOnInit(): void {
		if (!this.DataService.getUserData()) {
			console.log('new connection');
		}
	}

	ngOnDestroy(): void {
		console.log('destroy');
		this.DataService.resetTodos();
	}
}
