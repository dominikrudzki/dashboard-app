import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CookieService } from 'src/app/services/cookie.service';

@Component({
	selector: 'app-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
	navItems: {
		icon: string;
		text: string;
		route: string;
		styles?: string;
	}[] = [
		{ icon: 'home', text: 'Overview', route: 'overview' },
		{ icon: 'folder', text: 'Projects', route: 'projects' },
		{ icon: 'chat', text: 'Chat', route: 'chat' },
		{
			icon: 'settings',
			text: 'Settings',
			route: 'settings',
			styles: 'auto',
		},
		{ icon: 'logout', text: 'Log out', route: 'logout' },
	];

	@Output() menuClick: EventEmitter<void> = new EventEmitter<void>();

	constructor() {}
	ngOnInit(): void {}

	emit() {
		if (window.innerWidth <= 768) {
			this.menuClick.emit();
		}
	}
}
