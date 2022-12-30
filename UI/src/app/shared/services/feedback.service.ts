import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogComponent } from '../components/dialog/dialog.component';
import { TranslateService } from '../translate/translate.service';

@Injectable({
	providedIn: 'root',
})
export class FeedbackService {
	constructor(
		private readonly snackBar: MatSnackBar,
		private readonly dialog: MatDialog,
		private readonly translate: TranslateService
	) {}

	public successToast(dictionaryKey?: string) {
		this.snackBar.open(dictionaryKey ? this.translate.instant(dictionaryKey) : this.translate.instant('Feedback.GenericSuccess'));
	}

	public errorToast(dictionaryKey?: string) {
		this.snackBar.open(dictionaryKey ? this.translate.instant(dictionaryKey) : this.translate.instant('Feedback.GenericError'));
	}

	public confirmCancelDialog(itemName: string) {
		return this.dialog.open<DialogComponent, string, { deleted: boolean }>(DialogComponent, { data: itemName }).afterClosed();
	}
}
