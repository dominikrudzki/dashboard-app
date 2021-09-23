import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	loginForm!: FormGroup;

	constructor(
		private DataService: DataService,
		private formBuilder: FormBuilder
	) {}

	ngOnInit(): void {
		this.reactiveForm();
	}

	reactiveForm() {
		this.loginForm = this.formBuilder.group({
			username: [''],
			password: [''],
		});
	}

	submitForm() {
		this.DataService.logIn(this.loginForm.value);
	}
}
