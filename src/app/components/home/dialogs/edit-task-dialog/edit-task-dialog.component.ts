import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { Todos } from 'src/app/shared/interfaces';

@Component({
	selector: 'app-edit-task-dialog',
	templateUrl: './edit-task-dialog.component.html',
	styleUrls: ['./edit-task-dialog.component.scss'],
})
export class EditTaskDialogComponent {
	title!: string;
	description!: string;

	constructor(
		public dialogRef: MatDialogRef<EditTaskDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public list: Todos | any,
		private DataService: DataService
	) {
		console.log(list.listName, list.index);
	}

	editTodos() {
		this.DataService.editTodos(
			this.list.listName,
			{
				title: this.title,
				description: this.description,
			},
			this.list.index
		);

		this.onNoClick();
	}

	onNoClick(): void {
		this.dialogRef.close();
	}
}
