import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
		private DataService: DataService,
		private snackbar: MatSnackBar
	) {}

	ngOnInit(): void {}

	openSnackBar(message: string, action: string = ''): void {
		this.snackbar.open(message, action, {
			duration: 3000,
			panelClass: ['warn'],
			horizontalPosition: 'end',
			verticalPosition: 'bottom',
		});
	}

	changeValue() {
		switch (this.data.title) {
			case 'avatar':
				if (!this.input.match(/(https?:\/\/.*\.(?:png|jpg))/i)) {
					this.openSnackBar('Wrong image url');
					break;
				}
				this.DataService.setUserAvatar(this.input);
				break;
			case 'password':
				if (this.input.length < 5) {
					this.openSnackBar(
						'You password must be at least 5 characters'
					);
					break;
				}
				this.DataService.setUserPassword(this.input);
				break;
		}
		this.dialogRef.close();
	}
}
