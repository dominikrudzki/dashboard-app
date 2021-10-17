import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/services/data.service';
import { Message } from 'src/app/shared/interfaces';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
	messages: any = [{ author: '', avatar: '', date: new Date(), message: '' }]; //all messages list
	message: string = '';

	constructor(
		private firestore: AngularFirestore,
		private DataService: DataService,
		private snackbar: MatSnackBar
	) {}

	ngOnInit() {
		this.firestore
			.collection('chat')
			.valueChanges()
			.subscribe((messages: any) => {
				this.messages = messages.sort((a: Message, b: Message) => {
					return a.id - b.id;
				});

				setTimeout(() => {
					this.scrollToBottom();
				}, 100);
			});
	}

	openSnackBar(message: string, action: string = ''): void {
		this.snackbar.open(message, action, {
			duration: 3000,
			panelClass: ['warn'],
			horizontalPosition: 'end',
			verticalPosition: 'bottom',
		});
	}

	scrollToBottom(): void {
		try {
			document
				.querySelector('.msg-header:last-of-type')
				?.scrollIntoView({ behavior: 'smooth' });
		} catch (err) {}
	}

	async sendMessage() {
		if (this.message.trim().length === 0) {
			this.openSnackBar('Your message is empty!');
			this.message = '';
			return;
		}

		await this.firestore.collection('chat').add({
			id: new Date().valueOf(),
			author: this.DataService.userData.username,
			avatar: this.DataService.userData.avatar,
			message: this.message,
			date: new Date().valueOf(),
		});

		this.message = '';
	}
}
