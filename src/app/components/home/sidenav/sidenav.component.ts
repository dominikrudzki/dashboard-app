import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
	navItems: { icon: string; text: string; route: string; styles?: string }[] =
		[
			{ icon: 'home', text: 'Overview', route: 'overview' },
			{ icon: 'folder', text: 'Projects', route: 'projects' },
			{ icon: 'chat', text: 'Chat', route: 'chat' },
			{
				icon: 'settings',
				text: 'Settings',
				route: 'settings',
				styles: 'auto',
			},
			{ icon: 'logout', text: 'Log out', route: '' },
		];

	constructor() {}
	ngOnInit(): void {}
}
