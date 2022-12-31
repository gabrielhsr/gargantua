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
		this.toast(dictionaryKey ? this.translate.instant(dictionaryKey) : this.translate.instant('Feedback.GenericSuccess'));
	}

	public errorToast(dictionaryKey?: string) {
		this.toast(dictionaryKey ? this.translate.instant(dictionaryKey) : this.translate.instant('Feedback.GenericError'));
	}

	public toast(message: string) {
		this.snackBar.open(message);
	}

	public confirmCancelDialog(itemName: string) {
		return this.dialog.open<DialogComponent, string, { deleted: boolean }>(DialogComponent, { data: itemName }).afterClosed();
	}
}
