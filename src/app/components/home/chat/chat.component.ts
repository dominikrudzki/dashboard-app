import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
	messages: any;

	constructor(private firestore: AngularFirestore) {
		this.messages = [
			{ author: 'teste', date: new Date(), message: 'test!' },
		];
	}

	ngOnInit() {
		// prepare for live updates

		const chatDB = this.firestore.collection('chat').doc('messages');

		const sub = chatDB.valueChanges().subscribe((messages: any) => {
			console.log(messages.all[0]);

			this.messages = messages.all;
		});
		// .snapshotChanges()
		// .subscribe((doc) => {
		// 	console.log('change', doc);
		// });
	}
}
