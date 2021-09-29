import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { Todos } from 'src/app/shared/interfaces';

@Component({
	selector: 'app-delete-taks-dialog',
	templateUrl: './delete-taks-dialog.component.html',
	styleUrls: ['./delete-taks-dialog.component.scss'],
})
export class DeleteTaksDialogComponent {
	title!: string;
	description!: string;

	constructor(
		public dialogRef: MatDialogRef<DeleteTaksDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public list: Todos | any,
		private DataService: DataService
	) {
		// console.log(list.listName);
	}

	ngOnInit(): void {}

	deleteTodos() {
		this.DataService.addTodos(this.list.listName, {
			id: new Date().valueOf(),
			title: this.title,
			description: this.description,
			list: this.list.listName,
		});
	}

	onNoClick(): void {
		this.dialogRef.close();
	}
}
