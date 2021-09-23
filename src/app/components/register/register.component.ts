import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
		private formBuilder: FormBuilder
	) {}

	ngOnInit(): void {
		this.reactiveForm();
	}

	reactiveForm() {
		this.registerForm = this.formBuilder.group({
			username: [''],
			password: [''],
		});
	}

	submitForm() {
		console.log('Form submit');
	}
}
