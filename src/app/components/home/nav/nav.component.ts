import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
	userData!: Promise<any>;
	@Output() menuHandler: EventEmitter<void> = new EventEmitter<void>();

	constructor(private DataService: DataService) {
		this.userData = new Promise<any>((resolve, reject) => {
			resolve(this.DataService.userData);
		});
	}

	ngOnInit(): void {}

	showMenu() {
		this.menuHandler.emit();
	}
}
