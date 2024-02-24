import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { YesOrNoData, YesOrNoDialogComponent } from '../components/yes-no-dialog/yes-no-dialog.component';
import { CommandResponse } from '../utils/request-command';

@Injectable({
	providedIn: 'root',
})
export class FeedbackService {
	constructor(
		private readonly snackBar: MatSnackBar,
		private readonly dialog: MatDialog,
		private readonly translate: TranslateService
	) {}

	public successToast(dictionaryKey?: string, args?: { [key: string]: string }) {
		this.toast(dictionaryKey ? this.translate.instant(dictionaryKey, args) : this.translate.instant('Feedback.GenericSuccess'));
	}

	public errorToast(dictionaryKey?: string, args?: { [key: string]: string }) {
		this.toast(dictionaryKey ? this.translate.instant(dictionaryKey, args) : this.translate.instant('Feedback.GenericError'));
	}

	public toast(message: string) {
		this.snackBar.open(message);
	}

	public deleteDialog(itemName: string) {
		return this.dialog.open<ConfirmDialogComponent, string, { confirm: boolean }>(ConfirmDialogComponent, { data: itemName }).afterClosed();
	}

	public yesOrNoDialog(message: string, yesText?: string, noText?: string) {
		const data = { message, yesText, noText };

		return this.dialog.open<YesOrNoDialogComponent, YesOrNoData, { confirm: boolean }>(YesOrNoDialogComponent, { data }).afterClosed();
	}

	public toastResponse<T>(
		res: CommandResponse<T>,
		successKey: string = "Feedback.SaveSuccess",
		errorKey: string = "Feedback.SaveError"
	) {
		console.log(res);

		if (res.isSuccess) {
			this.snackBar.open(this.translate.instant(successKey))
		} else {
			this.snackBar.open(this.translate.instant(errorKey))
		}
	}

	public toastSuccessResponse<T>(res: CommandResponse<T>, successKey: string = "Feedback.SuccessAction") {
		if (res.isSuccess) {
			this.snackBar.open(this.translate.instant(successKey))
		}
	}

	public toastErrorResponse<T>(res: CommandResponse<T>, errorKey: string = "Feedback.GenericError") {
		if (!res.isSuccess) {
			this.snackBar.open(this.translate.instant(errorKey))
		}
	}
}
