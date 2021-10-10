import {
	CdkDragDrop,
	CdkDropList,
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

	lists!: {
		listTitle: string;
		listDialogName: string;
		listType: any[];
		connectedTo: string[];
	}[];

	constructor(public dialog: MatDialog, private DataService: DataService) {
		// this.todos = this.DataService.getTodos();
		// this.DataService.fetchTodos();
	}

	ngOnInit() {
		// 	console.log('cange');
		// this.todos = this.DataService.getTodos();
		this.lists = [
			{
				listTitle: 'To do',
				listDialogName: 'todo',
				listType: [],
				// listType: this.todos.todo,
				connectedTo: ['done', 'inProgress'],
			},
			{
				listTitle: 'In progress',
				listDialogName: 'inProgress',
				listType: [],
				// listType: this.todos.inProgress,
				connectedTo: ['done', 'todo'],
			},
			{
				listTitle: 'Done',
				listDialogName: 'done',
				listType: [],
				// listType: this.todos.done,
				connectedTo: ['todo', 'inProgress'],
			},
		];

		this.DataService.todosObs.subscribe((data) => {
			this.todos = data;

			for (const key in data) {
				const list = this.lists.findIndex((list) => {
					return list.listDialogName === key;
				});

				if (list !== -1) {
					this.lists[list].listType = data[<keyof Todos>key];
				}
			}
		});

		this.DataService;
	}

	drop(event: CdkDragDrop<any>) {
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

	openEditDialog(list: any, index: number) {
		console.log(list);

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
