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
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';

import { HomeComponent } from './components/home/home.component';
import { SidenavComponent } from './components/home/sidenav/sidenav.component';
import { NavComponent } from './components/home/nav/nav.component';
import { OverviewComponent } from './components/home/overview/overview.component';

const materialModules = [
	MatCardModule,
	MatFormFieldModule,
	MatFormFieldModule,
	MatInputModule,
	MatButtonModule,
	MatIconModule,
	MatToolbarModule,
	MatSidenavModule,
	MatGridListModule,
];

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		RegisterComponent,
		HomeComponent,
		SidenavComponent,
  NavComponent,
  OverviewComponent,
	],
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
