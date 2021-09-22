import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class DataService {
	users: Observable<any[]>;

	constructor(private firestore: AngularFirestore) {
		this.users = firestore.collection('users').valueChanges();
	}
}
