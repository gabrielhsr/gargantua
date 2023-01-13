import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface YesOrNoData {
	message: string;
	yesText?: string;
	noText?: string;
}

@Component({
	selector: 'yes-no-dialog',
	templateUrl: './yes-no-dialog.component.html',
	styleUrls: ['./yes-no-dialog.component.scss'],
})
export class YesOrNoDialogComponent {
	constructor(@Inject(MAT_DIALOG_DATA) public data: YesOrNoData) {}
}
