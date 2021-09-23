import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
	providedIn: 'root',
})
export class DataService {
	userData: any;

	constructor(private firestore: AngularFirestore) {}

	logIn(value: { username: string; password: string }) {
		console.log('value', value);

		this.firestore
			.collection('users')
			.doc(`${value.username}`)
			.valueChanges()
			.subscribe((data: { password: string } | any) => {
				if ((data.password = value.password)) {
					alert('you are logged in');
				}
			});
	}

	register(value: { username: string; password: string }) {}
}
