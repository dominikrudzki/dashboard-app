import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DataService } from 'src/app/services/data.service';
import { Message } from 'src/app/shared/interfaces';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
	messages: any; //all messages list
	message: string = '';

	constructor(
		private firestore: AngularFirestore,
		private DataService: DataService
	) {
		this.messages = [
			{ author: '', avatar: '', date: new Date(), message: '' },
		];
	}

	ngOnInit() {
		this.firestore
			.collection('chat')
			.valueChanges()
			.subscribe((messages: any) => {
				console.log(messages);

				this.messages = messages.sort((a: Message, b: Message) => {
					return a.id - b.id;
				});

				setTimeout(() => {
					this.scrollToBottom();
				}, 100);
			});
	}

	scrollToBottom(): void {
		console.log('scroll');

		try {
			document
				.querySelector('.example-dt:last-of-type')
				?.scrollIntoView({ behavior: 'smooth' });
		} catch (err) {}
	}

	async sendMessage() {
		console.log(this.message);

		await this.firestore.collection('chat').add({
			id: new Date().valueOf(),
			author: this.DataService.userData.username,
			avatar: this.DataService.userData.avatar,
			message: this.message,
			date: new Date().valueOf(),
		});

		this.message = '';
		console.log('submit');
	}
}
