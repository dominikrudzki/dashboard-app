import { Component, OnInit } from '@angular/core';
import { CookieService } from 'src/app/services/cookie.service';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
	messages: any;

	constructor() {
		this.messages = [
			{ username: 'admin', date: new Date(), message: 'Hello world!' },
			{ username: 'admin', date: new Date(), message: 'Hello world!' },
			{ username: 'admin', date: new Date(), message: 'Hello world!' },
			{ username: 'admin', date: new Date(), message: 'Hello world!' },
			{ username: 'admin', date: new Date(), message: 'Hello world!' },
			{ username: 'admin', date: new Date(), message: 'Hello world!' },
			{ username: 'admin', date: new Date(), message: 'Hello world!' },
			{ username: 'admin', date: new Date(), message: 'Hello world!' },
			{ username: 'admin', date: new Date(), message: 'Hello world!' },
			{ username: 'admin', date: new Date(), message: 'Hello world!' },
			{ username: 'admin', date: new Date(), message: 'Hello world!' },
			{ username: 'admin', date: new Date(), message: 'Hello world!' },
			{ username: 'admin', date: new Date(), message: 'Hello world!' },
			{ username: 'admin', date: new Date(), message: 'Hello world!' },
			{ username: 'admin', date: new Date(), message: 'Hello world!' },
		];
	}

	ngOnInit(): void {
		// prepare for live updates
		// this.firestore
		// 	.collection('chat')
		// 	.doc('messages')
		// 	.snapshotChanges()
		// 	.subscribe((doc) => {
		// 		console.log('change', doc);
		// 	});
	}
}
