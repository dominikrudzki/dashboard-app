import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { ChangeSettingsDialogComponent } from '../dialogs/change-settings-dialog/change-settings-dialog.component';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
	userData: any;
	deleteAccountEnable = false;

	constructor(private DataService: DataService, public dialog: MatDialog) {}

	ngOnInit(): void {
		this.userData = this.DataService.userData;
	}

	openSettingsDialog(
		list: string,
		dialogTitle: string,
		dialogPlaceholder: string
	) {
		const dialogRef = this.dialog.open(ChangeSettingsDialogComponent, {
			width: '350px',
			data: { title: dialogTitle, placeholder: dialogPlaceholder },
		});

		dialogRef.afterClosed().subscribe((result) => {
			console.log('The dialog was closed');
		});
	}

	deleteAccount() {
		this.DataService.deleteAccount();
	}
}
