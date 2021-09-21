import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './components/register/register.component';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

const materialModules = [
	MatCardModule,
	MatFormFieldModule,
	MatFormFieldModule,
	MatInputModule,
	MatButtonModule,
	MatIconModule,
	MatToolbarModule,
];

@NgModule({
	declarations: [AppComponent, LoginComponent, RegisterComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		...materialModules,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
