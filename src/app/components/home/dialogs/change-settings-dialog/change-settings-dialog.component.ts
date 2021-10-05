import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';

@Component({
	selector: 'app-change-settings-dialog',
	templateUrl: './change-settings-dialog.component.html',
	styleUrls: ['./change-settings-dialog.component.scss'],
})
export class ChangeSettingsDialogComponent implements OnInit {
	input: string = '';

	constructor(
		public dialogRef: MatDialogRef<ChangeSettingsDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private DataService: DataService
	) {}

	ngOnInit(): void {}

	changeValue() {
		switch (this.data.title) {
			case 'avatar':
				console.log('avatar change');
				this.DataService.setUserAvatar(this.input);
				console.log(this.DataService.getUserData());

				break;
			case 'password':
				console.log('password change');

				break;
		}
	}
}
