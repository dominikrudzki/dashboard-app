import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'src/app/services/cookie.service';
import { DataService } from 'src/app/services/data.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	loginForm!: FormGroup;

	constructor(
		private firestore: AngularFirestore,
		private DataService: DataService,
		private formBuilder: FormBuilder,
		private route: Router,
		private snackbar: MatSnackBar,
		private cookieService: CookieService
	) {
		this.cookieService.checkCookie() ? this.route.navigate(['/home']) : '';
	}

	ngOnInit(): void {
		this.reactiveForm();
		this.cookieService.checkCookie();
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
		this.loginForm = this.formBuilder.group({
			username: ['', Validators.required],
			password: ['', Validators.required],
		});
	}

	async submitForm(value: any) {
		if (this.loginForm.invalid) {
			this.openSnackBar('Fill in the fields');
			return;
		}

		try {
			const snapshot = await this.firestore
				.collection('users')
				.ref.where('username', '==', value.username)
				.get();

			if (snapshot.empty) {
				this.openSnackBar('Wrong username or password');
				this.loginForm.reset();
				return;
			}

			snapshot.forEach((doc: any) => {
				console.log(doc.data());

				if (value.password == doc.data().password) {
					this.DataService.setUserData({
						avatar: doc.data().avatar_url,
						username: doc.data().username,
						createDate: doc.data().create_date,
					});

					this.cookieService.setCookie('user', doc.id);

					this.route.navigate(['/home']);
				} else {
					this.openSnackBar('Wrong password');
				}
				// console.log(this.DataService.userData);
			});
		} catch {
			this.openSnackBar('Server connection error');
		}
	}
}
