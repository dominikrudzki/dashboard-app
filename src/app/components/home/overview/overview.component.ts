import { Time } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'src/app/services/cookie.service';

export interface PeriodicElement {
	date: Date;
	time: Time;
	message: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
	{
		date: new Date(2021, 0o0, 0o1),
		time: { hours: 0, minutes: 0 },
		message: 'Happy new 2021!',
	},
	{
		date: new Date(2020, 0o2, 0o24),
		time: { hours: 7, minutes: 14 },
		message: 'Welcome!',
	},
	{
		date: new Date(2018, 0o5, 0o5),
		time: { hours: 12, minutes: 32 },
		message: 'Hello World',
	},
];

@Component({
	selector: 'app-overview',
	templateUrl: './overview.component.html',
	styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
	displayedColumns: string[] = ['date', 'time', 'message'];
	dataSource = new MatTableDataSource(ELEMENT_DATA);
	username: string;

	constructor(private CookieService: CookieService) {
		this.username = this.CookieService.cookieUserName;
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}
}
