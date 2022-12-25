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
		private readonly translateService: TranslateService
	) {}

	public successToast(message?: string) {
		this.snackBar.open(message ?? this.translateService.translate('Feedback.GenericSuccess'));
	}

	public httpErrorToast(error: HttpErrorResponse) {
		this.snackBar.open(error.message);
	}
}
