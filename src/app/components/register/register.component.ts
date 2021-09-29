import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
	registerForm!: FormGroup;

	constructor(
		private DataService: DataService,
		private formBuilder: FormBuilder,
		private firestore: AngularFirestore,
		private snackbar: MatSnackBar,
		private route: Router
	) {}

	ngOnInit(): void {
		this.reactiveForm();
	}

	openSnackBar(message: string, action: string = ''): void {
		this.snackbar.open(message, action, {
			duration: 3000,
			panelClass: ['warn'],
			horizontalPosition: 'end',
			verticalPosition: 'bottom',
		});
	}

	reactiveForm() {
		this.registerForm = this.formBuilder.group({
			username: [''],
			password: [''],
		});
	}

	async submitForm(value: any) {
		console.log('Form submit');

		console.log(value);

		await this.firestore.collection(`users`).doc(value.username).set({
			password: value.password,
		});

		this.route.navigate(['/']);
	}
}
