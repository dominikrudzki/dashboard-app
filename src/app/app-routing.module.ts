import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OverviewComponent } from './components/home/overview/overview.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
	{ path: '', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{
		path: 'home',
		component: HomeComponent,
		children: [{ path: '', component: OverviewComponent }],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
