import { Injectable, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { YesOrNoData, YesOrNoDialogComponent } from '../components/yes-no-dialog/yes-no-dialog.component';
import { CommandResponse } from '../utils/command/query-command';

export type ActionDialogRes = undefined | {
    confirm: boolean;
};

@Injectable({
    providedIn: 'root'
})
export class FeedbackService {
    private readonly snackBar = inject(MatSnackBar);
    private readonly dialog = inject(MatDialog);
    private readonly translate = inject(TranslateService);

    public getFormError(input: string, form: FormGroup) {
        const field = form.get(input);
        const key = field?.errors ? Object.keys(field.errors)[0] : null;

        const hasRequiredLength = field?.errors?.[key as keyof typeof field.errors]?.requiredLength;
        const params = hasRequiredLength ? { 'required-length': hasRequiredLength } : {};

        return key ? this.translate.instant(`feedback.form.${key}`, params) : '';
    }

    public successToast(dictionaryKey?: string, args?: Record<string, string>) {
        this.toast(dictionaryKey ? this.translate.instant(dictionaryKey, args) : this.translate.instant('feedback.generic-success'));
    }

    public errorToast(dictionaryKey?: string, args?: Record<string, string>) {
        this.toast(dictionaryKey ? this.translate.instant(dictionaryKey, args) : this.translate.instant('feedback.generic-error'));
    }

    public toast(message: string) {
        this.snackBar.open(message);
    }

    public deleteDialog(itemName: string) {
        const dialog = this.dialog.open<ConfirmDialogComponent, string, ActionDialogRes>(ConfirmDialogComponent);

        dialog.componentInstance.itemName = itemName;

        return dialog.afterClosed();
    }

    public yesOrNoDialog(messageKey: string, yesKey?: string, noKey?: string) {
        const data: Partial<YesOrNoData> = { messageKey, yesKey, noKey };

        const dialog = this.dialog.open<YesOrNoDialogComponent, YesOrNoData, ActionDialogRes>(YesOrNoDialogComponent);

        dialog.componentInstance.data = data;

        return dialog.afterClosed();
    }

    public toastResponse<T>(
        res: CommandResponse<T>,
        successKey = 'Feedback.SaveSuccess',
        errorKey = 'Feedback.SaveError'
    ) {
        if (res.isSuccess) {
            this.snackBar.open(this.translate.instant(successKey));
        } else {
            this.snackBar.open(this.translate.instant(errorKey));
        }
    }

    public toastSuccessResponse<T>(res: CommandResponse<T>, successKey = 'Feedback.SuccessAction') {
        if (res.isSuccess) {
            this.snackBar.open(this.translate.instant(successKey));
        }
    }

    public toastErrorResponse<T>(res: CommandResponse<T>, errorKey = 'Feedback.GenericError') {
        if (!res.isSuccess) {
            this.snackBar.open(this.translate.instant(errorKey));
        }
    }
}
