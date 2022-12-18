import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
	@ViewChild('sidenav') private sidenav?: MatSidenav;

	public toggle(): void {
		if (!this.sidenav) {
			throw new Error("Property 'sidenav' undefined!");
		}

		this.sidenav.toggle();
	}
}
