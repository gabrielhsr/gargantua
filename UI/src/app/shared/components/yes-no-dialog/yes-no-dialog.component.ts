import { Component, Input, OnInit } from '@angular/core';

export interface YesOrNoData {
    messageKey: string;
    yesKey: string;
    noKey: string;
}

@Component({
    selector: 'yes-no-dialog',
    templateUrl: './yes-no-dialog.component.html',
    styleUrls: ['./yes-no-dialog.component.scss']
})
export class YesOrNoDialogComponent implements OnInit {
    protected options: YesOrNoData = {
        messageKey: 'feedback.yer-or-no.default-message',
        noKey: 'common.no',
        yesKey: 'common.yes'
    };

    @Input({ required: true }) public data?: Partial<YesOrNoData>;

    public ngOnInit(): void {
        this.options = { ...this.options, ...this.data };
    }
}
