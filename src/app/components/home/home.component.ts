import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CookieService } from 'src/app/services/cookie.service';
import { DataService } from 'src/app/services/data.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	constructor(
		private CookieService: CookieService,
		private DataService: DataService
	) {
		this.CookieService.checkCookie();
	}

	ngOnInit(): void {
		if (!this.DataService.getUserData()) {
			console.log('new connection');
		}
	}
}
