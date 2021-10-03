import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CookieService } from 'src/app/services/cookie.service';
import { Message } from 'src/app/shared/interfaces';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
	messages: any;
	message: string = '';

	constructor(
		private firestore: AngularFirestore,
		private CookieService: CookieService
	) {
		this.messages = [{ author: '', date: new Date(), message: '' }];
	}

	ngOnInit() {
		// prepare for live updates
		// .snapshotChanges()
		// .subscribe((doc) => {
		// 	console.log('change', doc);
		// });

		const sub = this.firestore
			.collection('chat')
			.valueChanges()
			.subscribe((messages: any) => {
				console.log(messages);

				this.messages = messages.sort((a: Message, b: Message) => {
					return a.id - b.id;
				});
			});
	}

	async sendMessage() {
		console.log(this.message);

		await this.firestore.collection('chat').add({
			id: new Date().valueOf(),
			author: this.CookieService.getCookieValue('user'),
			message: this.message,
			date: new Date().valueOf(),
		});

		this.message = '';

		// this.firestore
		// 	.collection('chat')
		// 	.doc('messages/all')
		// 	.set({ name: 'bbbb' }, { merge: true });
		console.log('submit');
	}
}
