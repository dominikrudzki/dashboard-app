import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
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
	) {}

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
			username: [''],
			password: [''],
		});
	}

	submitForm(value: any) {
		try {
			this.firestore
				.collection('users')
				.doc(`${value.username}`)
				.valueChanges()
				.subscribe((data: { password: string } | any) => {
					if (data.password === value.password) {
						console.log('You are logged in!');
						this.DataService.setUserData({
							username: value.username,
							password: value.password,
						});

						this.route.navigate(['/home']);
					} else {
						this.openSnackBar('Wrong password');
					}
				});
		} catch {
			this.openSnackBar('Fill in the fields');
		}
	}
}
