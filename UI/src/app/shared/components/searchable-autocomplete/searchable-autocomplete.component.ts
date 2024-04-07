import { Component, Input, OnInit } from '@angular/core';
import { BaseEntity } from 'src/app/domain/base.model';
import { QueryCommand } from '../../utils/request-command';

@Component({
    selector: 'app-searchable-autocomplete',
    templateUrl: './searchable-autocomplete.component.html',
    styleUrls: ['./searchable-autocomplete.component.scss'],
})
export class SearchableAutocompleteComponent implements OnInit {
    @Input() public queryCommand?: QueryCommand<BaseEntity>;

    constructor() {}

    public ngOnInit() {}
}
