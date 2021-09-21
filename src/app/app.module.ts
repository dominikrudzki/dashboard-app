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
import { MatListModule } from '@angular/material/list';

import { HomeComponent } from './components/home/home.component';
import { SidenavComponent } from './components/home/sidenav/sidenav.component';
import { NavComponent } from './components/home/nav/nav.component';
import { OverviewComponent } from './components/home/overview/overview.component';
import { ProjectsComponent } from './components/home/projects/projects.component';
import { ChatComponent } from './components/home/chat/chat.component';
import { SettingsComponent } from './components/home/settings/settings.component';

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
	MatListModule,
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
  ProjectsComponent,
  ChatComponent,
  SettingsComponent,
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
