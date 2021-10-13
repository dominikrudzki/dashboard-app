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

		// tmp default values
		this.DataService.setUserData({
			avatar: 'url(https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_960_720.png)', // fetch from database
			username: 'username',
			createDate: 1,
		});
	}

	async ngOnInit() {
		await this.DataService.fetchUserData();

		this.DataService.fetchTodos();

		// if (!this.DataService.getUserData()) {
		// 	console.log('new connection');
		// }
	}

	ngOnDestroy(): void {
		console.log('destroy');
		this.DataService.resetTodos();
	}
}
