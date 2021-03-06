import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './components/home/chat/chat.component';
import { HomeComponent } from './components/home/home.component';
import { LogoutComponent } from './components/home/logout/logout.component';
import { OverviewComponent } from './components/home/overview/overview.component';
import { ProjectsComponent } from './components/home/projects/projects.component';
import { SettingsComponent } from './components/home/settings/settings.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
	{ path: '', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{
		path: 'home',
		component: HomeComponent,
		children: [
			{ path: '', redirectTo: '/home/overview', pathMatch: 'full' },
			{ path: 'overview', component: OverviewComponent },
			{ path: 'projects', component: ProjectsComponent },
			{ path: 'chat', component: ChatComponent },
			{ path: 'settings', component: SettingsComponent },
			{ path: 'logout', component: LogoutComponent },
		],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
