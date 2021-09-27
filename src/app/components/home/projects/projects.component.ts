import {
	CdkDragDrop,
	moveItemInArray,
	transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { Todos } from 'src/app/shared/interfaces';
import { AddTaskDialogComponent } from '../dialogs/add-task-dialog/add-task-dialog.component';

@Component({
	selector: 'app-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
	todos!: Todos;

	display = false;

	constructor(public dialog: MatDialog, private DataService: DataService) {}

	ngOnInit(): void {
		console.log('getting todos');
		this.todos = this.DataService.getTodos();
		console.log('getting projects');
		this.display = true;

		console.log(this.todos);
	}

	drop(event: CdkDragDrop<any[] | any>) {
		this.DataService.updateTodos(this.todos);
		// console.log(this.todos);

		if (event.previousContainer === event.container) {
			moveItemInArray(
				event.container.data,
				event.previousIndex,
				event.currentIndex
			);
		} else {
			transferArrayItem(
				event.previousContainer.data,
				event.container.data,
				event.previousIndex,
				event.currentIndex
			);
		}
	}

	openAddDialog() {
		const dialogRef = this.dialog.open(AddTaskDialogComponent, {
			width: '350px',
			data: { listName: 'todoList' },
		});

		dialogRef.afterClosed().subscribe((result) => {
			console.log('The dialog was closed');
		});
	}
}
