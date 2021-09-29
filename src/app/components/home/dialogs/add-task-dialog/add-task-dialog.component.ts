import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { Todos } from 'src/app/shared/interfaces';

@Component({
	selector: 'app-add-task-dialog',
	templateUrl: './add-task-dialog.component.html',
	styleUrls: ['./add-task-dialog.component.scss'],
})
export class AddTaskDialogComponent {
	title!: string;
	description!: string;

	constructor(
		public dialogRef: MatDialogRef<AddTaskDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public list: Todos | any,
		private DataService: DataService
	) {
		console.log(list.listName);
	}

	addTodos() {
		this.DataService.addTodos(this.list.listName, {
			id: new Date().valueOf(),
			title: this.title,
			description: this.description,
			list: this.list.listName,
		});

		this.onNoClick();
	}

	onNoClick(): void {
		this.dialogRef.close();
	}
}
