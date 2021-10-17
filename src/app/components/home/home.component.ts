import { Component, OnDestroy, OnInit } from '@angular/core';
import { CookieService } from 'src/app/services/cookie.service';
import { DataService } from 'src/app/services/data.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
	visible: Boolean = true;

	constructor(
		private CookieService: CookieService,
		private DataService: DataService
	) {
		this.CookieService.checkCookie();
		this.DataService.fetchUserData();
	}

	ngOnInit() {
		this.DataService.fetchTodos();
		this.DataService.fetchAllUsers();
	}

	toogleMenu() {
		this.visible = !this.visible;
	}

	closeMenu() {
		if (window.innerWidth <= 768) {
			this.visible = true;
		}
	}

	ngOnDestroy(): void {
		this.DataService.resetTodos();
	}
}
