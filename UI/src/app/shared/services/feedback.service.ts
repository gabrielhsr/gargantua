import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '../translate/translate.service';

@Injectable({
	providedIn: 'root',
})
export class FeedbackService {
	constructor(
		private readonly snackBar: MatSnackBar,
		private readonly translate: TranslateService
	) {}

	public successToast(dictionaryKey?: string) {
		this.snackBar.open(dictionaryKey ? this.translate.instant(dictionaryKey) : this.translate.instant('Feedback.GenericSuccess'));
	}

	public errorToast(error: string) {
		this.snackBar.open(error);
	}
}
