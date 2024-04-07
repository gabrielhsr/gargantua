import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { YesOrNoData, YesOrNoDialogComponent } from '../components/yes-no-dialog/yes-no-dialog.component';
import { CommandResponse } from '../utils/request-command';

export type ActionDialogRes = undefined | {
    confirm: boolean;
};

@Injectable({
    providedIn: 'root'
})
export class FeedbackService {
    constructor(
        private readonly snackBar: MatSnackBar,
        private readonly dialog: MatDialog,
        private readonly translate: TranslateService
    ) {}

    public getFormError(input: string, form: FormGroup) {
        const field = form.get(input);
        const key = field?.errors ? Object.keys(field.errors)[0] : null;

        return key ? this.translate.instant(`ErrorMessage.${key}`) : '';
    }

    public successToast(dictionaryKey?: string, args?: Record<string, string>): void {
        this.toast(dictionaryKey ? this.translate.instant(dictionaryKey, args) : this.translate.instant('Feedback.GenericSuccess'));
    }

    public errorToast(dictionaryKey?: string, args?: Record<string, string>): void {
        this.toast(dictionaryKey ? this.translate.instant(dictionaryKey, args) : this.translate.instant('Feedback.GenericError'));
    }

    public toast(message: string): void {
        this.snackBar.open(message);
    }

    public deleteDialog(itemName: string): Observable<ActionDialogRes> {
        return this.dialog.open<ConfirmDialogComponent, string, ActionDialogRes>(ConfirmDialogComponent, { data: itemName }).afterClosed();
    }

    public yesOrNoDialog(message: string, yesText?: string, noText?: string): Observable<ActionDialogRes> {
        const data = { message, yesText, noText };

        return this.dialog.open<YesOrNoDialogComponent, YesOrNoData, ActionDialogRes>(YesOrNoDialogComponent, { data }).afterClosed();
    }

    public toastResponse<T>(
        res: CommandResponse<T>,
        successKey = 'Feedback.SaveSuccess',
        errorKey = 'Feedback.SaveError'
    ): void {
        console.log(res);

        if (res.isSuccess) {
            this.snackBar.open(this.translate.instant(successKey));
        } else {
            this.snackBar.open(this.translate.instant(errorKey));
        }
    }

    public toastSuccessResponse<T>(res: CommandResponse<T>, successKey = 'Feedback.SuccessAction'): void {
        if (res.isSuccess) {
            this.snackBar.open(this.translate.instant(successKey));
        }
    }

    public toastErrorResponse<T>(res: CommandResponse<T>, errorKey = 'Feedback.GenericError'): void {
        if (!res.isSuccess) {
            this.snackBar.open(this.translate.instant(errorKey));
        }
    }
}
