import { Component, OnInit } from '@angular/core';
import { CookieService } from 'src/app/services/cookie.service';
import { DataService } from 'src/app/services/data.service';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
	userData!: Promise<any>;

	constructor(private DataService: DataService) {
		this.userData = new Promise<any>((resolve, reject) => {
			resolve(this.DataService.userData);
		});
	}

	ngOnInit(): void {}
}
