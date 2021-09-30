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
import { EditTaskDialogComponent } from '../dialogs/edit-task-dialog/edit-task-dialog.component';

@Component({
	selector: 'app-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
	todos!: Todos;

	constructor(public dialog: MatDialog, private DataService: DataService) {}

	ngOnInit(): void {
		console.log('getting todos');
		this.todos = this.DataService.getTodos();
		console.log('getting projects');
		console.log(this.todos);
	}

	drop(event: CdkDragDrop<any[] | any>) {
		this.DataService.updateTodos();

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

	openAddDialog(list: string) {
		const dialogRef = this.dialog.open(AddTaskDialogComponent, {
			width: '350px',
			data: { listName: list },
		});

		dialogRef.afterClosed().subscribe((result) => {
			console.log('The dialog was closed');
		});
	}

	openEditDialog(list: string, index: number) {
		const dialogRef = this.dialog.open(EditTaskDialogComponent, {
			width: '350px',
			data: { listName: list, index: index },
		});

		dialogRef.afterClosed().subscribe((result) => {
			console.log('The dialog was closed');
		});
	}

	deleteTodo(list: any, index: number) {
		this.DataService.deleteTodos(list, index);
	}
}
