import {
	CdkDragDrop,
	moveItemInArray,
	transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
	todo = [
		{
			title: 'Create new angular project',
			desc: 'Create another todo list.',
		},
		{
			title: 'Add few components',
			desc: 'Add and style components to make your animation looks better',
		},
	];
	inProgress = [
		{
			title: 'Repair animation',
			desc: 'Animation is little laggy when scrolling from bottom to top of the page.',
		},
	];
	done = [
		{
			title: 'Change font family',
			desc: 'Change font to Roboto, sans-serif.',
		},
	];

	constructor() {}

	ngOnInit(): void {}

	drop(event: CdkDragDrop<any[] | any>) {
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
}
