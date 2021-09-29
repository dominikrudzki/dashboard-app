import { Component, OnInit } from '@angular/core';
import { CookieService } from 'src/app/services/cookie.service';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.component.html',
	styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
	username: string;

	constructor(private CookieService: CookieService) {
		this.username = this.CookieService.cookieUserName;
	}

	ngOnInit(): void {}
}
