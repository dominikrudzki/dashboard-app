import { Time } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';

export interface PeriodicElement {
	avatar: string;
	username: string;
	date: number;
}

// const ELEMENT_DATA: PeriodicElement[] = [
// 	{
// 		avatar: 'https://blog.angular-university.io/content/images/2020/12/main-page-logo-small-hat.png',
// 		username: 'admin',
// 		date: 0,
// 	},
// 	{
// 		avatar: 'https://blog.angular-university.io/content/images/2020/12/main-page-logo-small-hat.png',
// 		username: 'mama',
// 		date: 0,
// 	},
// ];

@Component({
	selector: 'app-overview',
	templateUrl: './overview.component.html',
	styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
	displayedColumns: string[] = ['date', 'time', 'message'];
	dataSource = new MatTableDataSource();
	userData!: Promise<any>;

	constructor(private DataService: DataService) {
		this.userData = new Promise<any>((resolve, reject) => {
			resolve(this.DataService.userData);

			this.DataService.allUsers.subscribe((obs) => {
				this.dataSource = new MatTableDataSource(
					this.DataService.allUsers.value
				);
			});
		});

		// this.dataSource = new MatTableDataSource(this.DataService.allUsers);
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}
}
