import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
			username: ['', [Validators.required, Validators.minLength(5)]],
			password: ['', [Validators.required, Validators.minLength(5)]],
		});
	}

	async submitForm(value: any) {
		if (this.registerForm.invalid) {
			if (
				!this.registerForm.value.username ||
				!this.registerForm.value.password
			) {
				this.openSnackBar('Fill in the fields');
				return;
			}
			this.openSnackBar(
				'Username and password shoud have at least 5 characters'
			);
			return;
		}

		await this.firestore.collection(`users`).ref.add({
			avatar_url:
				"url('https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_960_720.png')",
			create_date: new Date().valueOf(),
			password: value.password,
			username: value.username,
		});

		this.route.navigate(['/']);
	}
}
