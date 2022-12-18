import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from './components/add-dialog/add-dialog.component';

@Component({
	selector: 'app-home',
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
	constructor(private readonly dialog: MatDialog) {}

	ngOnInit(): void {}

	openAddDialog() {
		this.dialog.open(AddDialogComponent);
	}
}
